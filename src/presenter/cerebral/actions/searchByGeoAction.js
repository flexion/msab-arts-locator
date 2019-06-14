import { state } from 'cerebral';

export const searchByGeoAction = async ({ applicationContext, get, store }) => {
  if (get(state.haveGeo)) {
    const result = await applicationContext
      .getUseCases()
      .getArtLocationsInRadius({
        requestData: {
          lat: get(state.position).lat,
          long: get(state.position).long,
          radius: get(state.radius),
        },
        applicationContext,
      });
    return { result };
  }
};
