import authApi from '../../../../api/authApi';

export const changeNameAction = async ({ commit }, user) => {
   try {
      const { idToken, refreshToken, name } = user;
      const { data } = await authApi.post(':update', {
         idToken,
         refreshToken,
         displayName: name
      });

      commit('updateUser', { user, idToken, refreshToken });

      return { ok: true };
   } catch (error) {
      return {
         ok: false,
         message: error
      };
   }
};
