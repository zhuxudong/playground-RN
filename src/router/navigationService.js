import {NavigationActions} from 'react-navigation';

let _navigator;
let _navBottom;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function setNavBottom(navBottom) {
    _navBottom = navBottom;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
    switch (routeName) {
        case "Home":
            _navBottom.highLight(0);
            break;
        case "Classify":
            _navBottom.highLight(1);
            break;
        case "Favorite":
            _navBottom.highLight(2);
            break;
        case "My":
            _navBottom.highLight(3);
            break;
    }
}

export default {
    setTopLevelNavigator,
    setNavBottom,
    navigate,
};