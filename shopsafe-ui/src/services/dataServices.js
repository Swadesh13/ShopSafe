import http from './httpServices';
import api from '../configApi.json';

const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxODQ1OWJiYTE2NGJiN2I5MWMzMjhmODkxZjBiNTY1M2UzYjM4YmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcHNhZmUtanUiLCJhdWQiOiJzaG9wc2FmZS1qdSIsImF1dGhfdGltZSI6MTU5NDgyOTk4NSwidXNlcl9pZCI6IllmQnVrOWVuUmRWaWhzU1pVN3VFSjdCZ3pJMDIiLCJzdWIiOiJZZkJ1azllblJkVmloc1NaVTd1RUo3Qmd6STAyIiwiaWF0IjoxNTk0ODI5OTg1LCJleHAiOjE1OTQ4MzM1ODUsImVtYWlsIjoiYWJjZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWJjZEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.c1K5-2TAqHCzgFvkGqczSJNEzzD3V3k8UIwm5pEGrgOhDXII_9aIT9TghzPzH1uEvpq1R5nHCrnI--M2WKonM5sjuHKyQ6kwzbBi3bAVjtyLqAuIbAUcH3p0q6mD9WURy-NKyMAiH3fopcl3eJDI-lV_cMLhwKv62DlzDziF49h5DMXB8Diyl71iT63CJDHqaPfxVDdpwD_PUJEcLD7z5rk2AtGc4vguKb-1KVo6Vxce0GOrX1_TyWgbRYmSyITKBevLndPCqNyXMj3QmcbwJ6HONzjyyv68A94gycjTZHaRsk-smduqtE4Mjx5-pRr876LwXFqcGBk3YrHo9-mzCA";


export const getShopList = () => {
    // try {
    //     // const response = await http.get(api.shopList, {
    //     //   headers: {
    //     //     Authorization: `Bearer ${token}`,
    //     //   },
    //     // }); 
    //     const response = await http.get(api.shopList);
    //     return response.data;

    // } catch (ex) {
    //     console.log(ex);
    // }
    const response = http.get(api.shopList);
    return response;
}