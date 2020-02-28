import {getAllCubeInfo} from '@/services/cube';

const cubeModel={
  namespace: "cube",
  state: {
    allCube: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getAllCubeInfo);
      yield put({
        type: 'get',
        payload: response,
      });
    },
  }
};

export default cubeModel;
