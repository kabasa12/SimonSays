import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    resultsContainer: {
        marginBottom: 20,
    },
    result: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white'
    },
});

export default styles;