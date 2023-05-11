import axios from 'axios';
const BASE_URL = 'https://rickandmortyapi.com/api';


export const get = async (path: any, page: any) => {
  const url = `${BASE_URL}${path}?page=${page}`;

  const getData = () => {
    return axios.get(`${url}`)
      .then(async response => {
        const data = response.data.results;

        //  GET Origin dimesnions and amount of residents
        const originPromises = data.map((item: {
          origin: {
            name: string; url: string;
          };
        }) => {
          if (item?.origin.name !== 'unknown') { // when origin name get unknown or no any url in origin object
            return axios.get(item?.origin?.url)
              .then(response => {
                return response.data
              });
          };
        });
        //  GET locations dimesnions and amount of residents
        const locationPromises = data.map((item: { location: { url: string; }; }) => {
          if (item?.location?.url) {     // check location object has URL key available  
            return axios.get(item?.location?.url)
              .then(response => response.data);
          };
        });

        //  GET Name of the chapters the character is featured
        const characterPromises = data.map((item: {
          url: any; location: { url: string; };
        }) => {
          if (item?.url) {
            return axios.get(item?.url)
              .then(response => response.data);
          };
        });
        const locationResults = await Promise.all(locationPromises);
        const characterResults = await Promise.all(characterPromises);

        return Promise.all(originPromises).then(originResponse => {
          const result = data.map((item: any, index: any) => {
            return {
              ...item,
              originResponse: originResponse[index],
              locationResponse: locationResults[index],
              characterResponse: characterResults[index]
            };
          });
          return result;
        });
      });
  };

  getData().then(profileDetails => {
    return profileDetails
  });

  return getData();
};


