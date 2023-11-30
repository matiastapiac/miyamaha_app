import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import {images} from '../common/images';
import ImageCarousel from '../components/ImageCarousel';
import {curousel} from '../common/utils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../common/dimensions';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [images.img4, images.img5, images.img4, images.img5],
    };
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
  }
  render() {
    return (
      <Container>
        <TopHeader />

        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1, paddingBottom: hp(20)}}>
            <ImageCarousel images={curousel} />
            <View style={{flex: 1}}>
              <FlatList
                data={this.state.data}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center'}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity style={{margin: 10}}>
                    <Image
                      source={item}
                      style={{
                        height: wp(45),
                        width: wp(45),
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
