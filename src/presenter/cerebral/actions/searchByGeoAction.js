import { state } from 'cerebral';

export const searchByGeoAction = async ({ applicationContext, get }) => {
  if (get(state.haveGeo)) {
    const result = await applicationContext
      .getUseCases()
      .getArtLocationsInRadius({
        applicationContext,
        requestData: {
          lat: get(state.position).lat,
          long: get(state.position).long,
          radius: get(state.radius),
        },
      });
    return result;
  }
};
