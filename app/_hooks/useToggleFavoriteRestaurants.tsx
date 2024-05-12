import { toggleUserFavoriteRestaurants } from '../_actions/restaurants';


interface PropsToggleFavorite{
  userId?: string;
  restaurantId: string;

}

const useToggleFavoriteRestaurants = ({restaurantId, userId}: PropsToggleFavorite) => {

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleUserFavoriteRestaurants(userId, restaurantId);
      console.log('toggleFavorite')
    } catch (err) {
      console.log(err);
    }
  };
  return {handleFavoriteClick}
}

export default useToggleFavoriteRestaurants
