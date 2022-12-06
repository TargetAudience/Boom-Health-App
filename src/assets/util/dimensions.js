import { Dimensions } from "react-native";

const HEIGHT_SMALL = 667;
const DeviceScreen = Dimensions.get("screen");
export const IsSmallScreen = Dimensions.get("screen").height <= HEIGHT_SMALL;
export const SizeToDevice = ((size) => 
{
    const deviceScreenHeight = Dimensions.get("screen").height;
    return (
        deviceScreenHeight <= HEIGHT_SMALL
            ? deviceScreenHeight/HEIGHT_SMALL * size
            : size
    );
});