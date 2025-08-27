import { StyleSheet } from "react-native";
import { color } from "../../../constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F9F9F9',
        alignItems: 'center',
        // paddingHorizontal: 20,
        justifyContent: 'center',
        marginHorizontal:20
    },
    logoContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logoCircle: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        color: '#555',
        marginBottom: 30,
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
    },
    buttonPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.primary,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        justifyContent: 'center',
        gap: 10,
    },
    buttonPrimaryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonSecondary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: '#0A7F7F',
    },
    buttonSecondaryText: {
        color: color.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});

