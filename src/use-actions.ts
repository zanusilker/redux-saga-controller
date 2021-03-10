
// outsource dependencies
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

// local dependencies
import { Controller } from './index';
import { forceCast, getKeys } from './constant';

// HOOK
export const useActions = <Initial, Actions>(controller: Controller<Initial, Actions>): Actions => {
  const dispatch = useDispatch();
  const actions: Actions = controller.action;
  return useMemo(() => {
    const wrappedActions = {} as Record<keyof Actions, Actions[keyof Actions]>;
    getKeys(actions).map((name) => {
      const action = actions[name];
      wrappedActions[name] = forceCast<Actions[keyof Actions]>(<Payload>(payload: Payload) => {
        if (typeof action === 'function') {
          dispatch(action(payload));
        }
      });
    });
    return forceCast<Actions>(wrappedActions);
  }, [actions, dispatch]);
};
