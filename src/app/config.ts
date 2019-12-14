const url = 'https://brabus.io:8443';
const account = 'D100596';
const authenId =
  '0ba8a81d3384b179a49ff72b0c2e32c25e6a42a9c68fb773930e06a047010566&EIO';
const token =
  '4282e03370de48d67878bfd467913edf.3274aa403b758344f38c7cef3d2d79ea';
const pathGetDataSocket = `?token=${token}&account=${account}&authen=${authenId}&EIO=3&transport=websocket&sid=`;
const pathGetSid = `?token=${token}&account=${account}&authen=${authenId}&EIO=3&transport=polling`;
const currency = 'BTCUSD';
const pathSocket = '/socket.io/';
const queryConnect = `token=${token}&account=${account}&authen=${authenId}`;
export const config = {
  url,
  account,
  authenId,
  token,
  currency,
  pathSocket,
  urlGetSid: url + pathSocket + pathGetSid,
  urlGetSocket: url + pathSocket + pathGetDataSocket,
  queryConnect
};
