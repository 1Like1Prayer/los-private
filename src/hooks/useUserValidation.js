import {deleteUser, getUser} from '../core/auth';
import apiClient from '../core/apiClient';
import Toast from 'react-native-toast-message';
import {routes} from '../routes/routes';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';

export const useUserValidation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const validateUser = async () => {
        try {
            const {phoneNumber, bnNumber} = await getUser();
            let success = await apiClient.getUserValidity(phoneNumber, bnNumber);
            success ? console.log('user is valid') : console.log('user is not valid');
            if (!success) {
                deleteUser()
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        Toast.show({
                            type: 'error',
                            text1: 'User is not allowed!'
                        });
                        navigation.navigate(routes.LOGIN);
                    });
            }
        } catch (e) {
            console.error('Error validating user:', error);
        }
    };

    useFocusEffect(useCallback(() => {
        console.log('Route changed, current route:', route.name);
        validateUser();
    }, [route]));
};
