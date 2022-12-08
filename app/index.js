import { View, Text, Button } from "react-native";
import { Link, Stack } from "expo-router";
import config from '../src/aws-exports';
import { DataStore, Amplify } from 'aws-amplify';
import { Contact } from '../src/models'
import { useState } from "react";

Amplify.configure(config)

export default function Home() {
    const [contacts, setContacts] = useState([])

    async function fetchContacts() {
        const allContacts = await DataStore.query(Contact)
        setContacts(allContacts)
    }

    fetchContacts()

    return (
        <View style={container}>
            <Stack.Screen options={{ title: "Contacts" }} />
            {
                contacts.map(contact => (
                    <View key={contact.id} style={contactBox}>
                        <Link href={`contacts/${contact.id}`}>
                            <View>
                                <Text style={textStyleName}>{contact.name}</Text>
                                <Text style={textStyle}>{contact.phone}</Text>

                            </View>
                        </Link>
                        <Link href={`contacts/${contact.id}`}>
                            <Button
                                title="View contact"
                                color="#841584"
                            />
                        </Link>

                    </View>
                ))
            }
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
    marginVertical: 10,
}

