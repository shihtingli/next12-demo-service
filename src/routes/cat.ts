import { FastifyInstance, RouteShorthandOptions, FastifyReply } from "fastify";
import { ICat } from "../types/cat";
import { CatRepoImpl } from "./../repo/cat-repo";

const CatRouter = (
  server: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (error?: Error) => void
) => {
  const catRepo = CatRepoImpl.of();
  interface IdParam {
    id: string;
  }
  server.get("/cats", async (request, reply) => {
    const catRepo = CatRepoImpl.of();
    try {
      const cats = await catRepo.getCats();
      return reply.status(200).send({ cats });
    } catch (error) {
      return reply.status(500).send({ msg: "Internal Server Error" });
    }
  });

  server.post("/cats", async (request, reply) => {
    const catRepo = CatRepoImpl.of();
    try {
      const catBody = request.body as ICat;
      const cat = await catRepo.addCat(catBody);
      return reply.status(201).send({ cat });
    } catch (error) {
      return reply.status(500).send({ msg: "Internal Server Error" });
    }
  });

  server.put<{ Params: IdParam; Body: ICat }>(
    "/Cats/:id",
    opts,
    async (request, reply) => {
      try {
        const id = request.params.id;
        const CatBody = request.body;
        const Cat = await catRepo.updateCat(id, CatBody);
        if (Cat) {
          return reply.status(200).send({ Cat });
        } else {
          return reply.status(404).send({ msg: `Not Found Cat:${id}` });
        }
      } catch (error) {
        console.error(`PUT /Cats/${request.params.id} Error: ${error}`);
        return reply.status(500).send(`[Server Error]: ${error}`);
      }
    }
  );

  server.delete<{ Params: IdParam }>(
    "/Cats/:id",
    opts,
    async (request, reply) => {
      try {
        const id = request.params.id;
        const Cat = await catRepo.deleteCat(id);
        if (Cat) {
          return reply.status(204).send();
        } else {
          return reply.status(404).send({ msg: `Not Found Cat:${id}` });
        }
      } catch (error) {
        console.error(`DELETE /Cats/${request.params.id} Error: ${error}`);
        return reply.status(500).send(`[Server Error]: ${error}`);
      }
    }
  );

  done();
};

export { CatRouter };
