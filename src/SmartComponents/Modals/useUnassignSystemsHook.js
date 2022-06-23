import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

import { removePatchSetApi } from '../../Utilities/api';
import { patchSetUnassignSystemsNotifications } from '../../Utilities/constants';

/**
*Handles removing one or more systems from different patch sets.
* @param {Function} [handleModalToggle] function to close the modal on callback
* @param {Array} [systemsWithPatchSet] array of systems to be removed
* @returns {handleSystemsRemoval}
*/
export const useUnassignSystemsHook = (handleModalToggle, systemsWithPatchSet) => {
    const dispatch = useDispatch();
    const handleSystemsRemoval = async () => {
        const result = await removePatchSetApi({ inventory_ids: systemsWithPatchSet });

        //TODO: mockups do not have error notifications designed, add them if UX designes.
        if (result.status === 200) {
            handleModalToggle(true);
            dispatch(
                addNotification(
                    patchSetUnassignSystemsNotifications(systemsWithPatchSet?.length || 0).success
                )
            );
        }
    };

    return handleSystemsRemoval;
};