import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'red',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
    },
    button: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
        maxHeight: 100,
        maxWidth: 100,
    },
    txt: {
        fontSize: 28,
        fontWeight: 'bold',
    }
});

export default styles;