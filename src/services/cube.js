import request from '@/utils/request';
export async function getAllCubeInfo(req) {
  console.log(req);

  return request(`/cube/getAllCubeInfo?id=${req.id}&name=${req.name}`);
}
