import {
  createBlog,
  deleteBlog,
  getBlogs,
  getBlog,
  updateBlog,
} from "../../../database/controller";
import connectMongo from "../../../database/connection";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "error in the connection" })
  );

  //Type of Request
  const { method } = req;

  switch (method) {
    case "GET":
      getBlogs(req, res);
      break;
    case "POST":
      createBlog(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
