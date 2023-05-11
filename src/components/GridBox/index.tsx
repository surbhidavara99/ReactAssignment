import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useApi } from '../../providers/apiContext';


interface originProps {
    name: string;
    url: string;
}

interface originDetailsProps {
    dimension: string;
    residents: any;
}

interface locationProps {
    name: string;
    url: string;
}

interface locationDetailsProps {
    dimension: string;
    residents: any;
}
interface characterDetailsProps {
    name: string;
}

interface categoryProps {
    id: string;
    name: string;
    species: string;
    image: string;
    gender: string;
    origin: originProps;
    location: locationProps;
    originResponse: originDetailsProps;
    locationResponse: locationDetailsProps;
    characterResponse: characterDetailsProps;
}


const Item = ({ id, name, species, gender, image, origin, originResponse, location, locationResponse, characterResponse }: categoryProps) => (
    <View key={id} style={styles.box}>
        <Image style={styles.profileImage} source={{ uri: image }} />
        <View style={styles.rightSide}>
            <Text style={styles.textStyle}>Name : {name}</Text>
            <Text style={styles.textStyle}>Gender : {gender}</Text>
            <Text style={styles.textStyle}>Species : {species}</Text>
            <Text style={styles.textStyle} > Origin : {origin?.name}</Text>
            <Text style={styles.textStyle} > Dimensions : {originResponse?.dimension || "-"}</Text>
            <Text style={styles.textStyle} > Amount of residents : {originResponse?.residents?.length || "-"}</Text>
            <Text style={styles.textStyle} > Location : {location?.name}</Text>
            <Text style={styles.textStyle} > Amount of location residents : {locationResponse?.residents?.length || "-"}</Text>
            <Text style={styles.textStyle} >Chapter name: {characterResponse?.name}</Text>
        </View>
        <View>
        </View>
    </View>
);


const GridBox = () => {
    const [categoryProfile, setCategoryProfile] = useState<categoryProps[]>([]);
    const [page, setPage] = useState(1);


    const { fetchData } = useApi();

    useEffect(() => {

        const getData = async () => {
            const data = await fetchData('/character', page);
            setCategoryProfile(data)
        };


        getData();
    }, [page]);

    // pagination function 
    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerName}>List Of Character Details</Text>
            <FlatList
                data={categoryProfile}
                renderItem={({ item }) => <Item id={item.id} name={item.name}
                    species={item.species} gender={item.gender} image={item.image}
                    origin={item.origin} originResponse={item.originResponse}
                    location={item.location}
                    locationResponse={item.locationResponse}
                    characterResponse={item.characterResponse}
                />}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    headerName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 15,
    },
    box: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
    },
    rightSide: {
        flex: 1,
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    gender: {
        fontSize: 14,
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
    },
});
export default GridBox;
