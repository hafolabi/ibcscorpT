import service from "../fetchInterceptor";

const dataService: any = {};

dataService.getAllPosts = (): Promise<any> =>
  service({
    url: "/posts",
    method: "get",
    headers: { "public-request": "true" },
  });

  dataService.createPost = (data: any): Promise<any> =>
  service({
    url: `/posts`,
    method: "post",
    data,
    headers: { "public-request": "true" },
  });

  dataService.editPost = (id:number, data: any): Promise<any> =>
  service({
    url: `/posts/${id}`,
    method: "put",
    data,
    headers: { "public-request": "true" },
  });

  dataService.deletePost = (id:number): Promise<any> =>
  service({
    url: `/posts/${id}`,
    method: "delete",
    headers: { "public-request": "true" },
  });

  export default dataService;