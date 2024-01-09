import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  //GET Method
  if (request.method === "GET") {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(recipe);
  }

  if (request.method === "PUT") {
    try {
      const recipe = await Recipe.findOneAndUpdate(
        { _id: request.query.id },
        request.body,
        { new: true }
      );
      response.status(200).json(recipe);
    } catch (error) {
      console.log("PUT /api/recipe/:id", error);
      response.status(500).json({ message: "Error updating recipe" });
    }
    return;
  }

  if (request.method === "DELETE") {
    try {
      const recipe = await Recipe.findOneAndDelete({ _id: request.query.id });
      response.status(200).json(recipe);
    } catch (error) {
      console.log("DELETE /api/recipe/:id", error);
      response.status(500).json({ message: "Error deleting recipe" });
    }
    return;
  }

  response.status(405).json({ message: "Method not allowed" });
}
