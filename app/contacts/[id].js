import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Contact } from "../../src/models";
import { DataStore } from "aws-amplify";

export default function SingleContact({ route }) {
    const [contact, setContact] = useState('')

    useEffect(() => {
        if (!route.params?.id) {
            return
        }
        DataStore.query(Contact, route.params.id).then(setContact)
    }, [route.params?.id])
    return (
        <View style={container}>
            <Stack.Screen options={{ title: contact.name }} />
            <View style={contactBox}>
                <Text style={textStyleName}>{contact.name}</Text>
                <Text style={textStyle}>{contact.phone}</Text>
                <Text style={textStyle}>{contact.email}</Text>
                <Text style={textStyle}>{contact.address}</Text>
                <Text style={textStyle}>{contact.message}</Text>
            </View>
        </View>
    );
}

const container = { padding: 20, paddingTop: 40 }
const contactBox = {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
}
const textStyleName = {
    fontSize: 28,
}
const textStyle = {
    fontSize: 18,
    color: '#000',
    fontWeight: 'normal',
    marginVertical: 10
}