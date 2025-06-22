// components/pdf/FormOne.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: "Helvetica",
    },
    section: {
        marginBottom: 10,
    },
    heading: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
    },
});

const FormOne = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.heading}>Concept Paper Adviser Endorsement Form</Text>
                <Text>Hello po! This is the actual content.</Text>
            </View>
        </Page>
    </Document>
);

export default FormOne;
