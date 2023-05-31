import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'//'#E5E5E5',
    },
    circle: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 100,
        maxHeight: 100,
        maxWidth: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        top: -230
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    startBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
    },
    redButton: {
        backgroundColor: '#FF5252',
        borderTopLeftRadius: 200,
        borderBottomRightRadius: 150
    },
    greenButton: {
        backgroundColor: '#66BB6A',
        borderTopRightRadius: 200,
        borderBottomLeftRadius: 150
    },
    blueButton: {
        backgroundColor: '#448AFF',
        borderBottomLeftRadius: 200,
        borderTopRightRadius: 150
    },
    yellowButton: {
        backgroundColor: '#FFC107',
        borderBottomRightRadius: 200,
        borderTopLeftRadius: 150
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    footerText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        maxHeight: 20,
    }
});

export default styles;