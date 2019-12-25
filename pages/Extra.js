import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import {
  Screen,
  CardDotted,
  MediumText,
  SmallHeading,
  SmallText
} from "../css/designSystem";

import Header from "../components/Header";
import NotesModal from "../components/NotesModal";
import ActionButton from "../components/ActionButton";
import PhotosView from "../components/PhotosView";
import Database from "../Database";
import GooglePhoto from "../components/GooglePhoto";

export default class RoadmapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.closeModal = this.closeModal.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.refreshPhotos = this.refreshPhotos.bind(this);
    this.state = {
      value: "",
      noteModalVisible: false,
      photosAdded: false,
      photos: null,
      mood_id: this.props.navigation.getParam("moodId", null),
      note: null
    };
  }

  updateNote(note) {
    this.setState({ note: note });
  }

  closeModal(modal) {
    if (modal == "note") {
      this.setState({ noteModalVisible: false });
    }
  }

  buttonSubmit() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Common" })]
    });

    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    this.database.db.transaction(tx => {
      tx.executeSql(`INSERT INTO extras (mood_id, notes) VALUES (?, ?);`, [
        this.state.mood_id,
        null
      ]);
    });
  }

  refreshPhotos() {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM photos WHERE mood_id = ?;`,
        [this.state.mood_id],
        (_, { rows: { _array } }) =>
          this.setState({ photosAdded: true, photos: _array })
      );
    });
  }

  notesSection() {
    if (this.state.note) {
      return (
        <View style={{ maxHeight: 150, padding: 15 }}>
          <SmallHeading>Notes:</SmallHeading>
          <SmallText numberOfLines={4}>{this.state.note}</SmallText>
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={{ width: 40, height: 40, alignSelf: "center" }}
            source={{
              uri: "https://lifetracker.fra1.digitaloceanspaces.com/notes.png"
            }}
          />

          <MediumText>Notes</MediumText>
        </View>
      );
    }
  }

  photoSection() {
    if (this.state.photos) {
      console.log(this.state.photos[0]);
      return (
        <PhotosView
          uri={
            "https://lh3.googleusercontent.com/lr/AGWb-e4q6e8Wnc1JeLTQT8maKB5-wQL2Ci0nm3dHhbc4sQI-Yq_joTDRoeSht-ZoGqjYJQHOW7gelszruFSs1cTU5z_9W2hithZ3d_FMvhOXm1da0JwZTrm94Qfefga3jjs2TXipuFaI8Hrey4UgVuvtU_HiOVxJ9DAMbWsnVwpMKzt8Cn1hL_yoYTL3kiodNzLBMawpKmnD6a9ri1hNXucO4v4ADIjn-L2pH6AN4ZsWxtobvOE3I03DSq-nTWDL2cqHL_p05KinTr_GQt6hhTalce_C2IMbxkK2YF6dDOKyeePJ-5rqE2DEjvpyQmmDIPZFElUZclWKDI4pRJPaPpZdjvl4s_C8vM3VqATgUyW2qgJflZt3ooCWZ_EqYCStDIP9SCm4-b8iHsMaOG-5e7_v2JESdOohg3TiaBvn8CAfUU4rMps3FxyhpvVrv42wRbzVEaFjVaR-RG9fEyXFvV81j_dWYe0F0yEC1zaUapIrc42hOObY79bTcFcsC-nOU39uYkdGC5oTLxbJK0wMfdDfniMhhRoQ4E2T8Xd40M_HCW2fTqY12oP8wutZdEuIC53HvFLXhErk1A6FVL8-h3VfxC5QemTur_t2Ps2o6Tfpxi0OPfRyXJPwRMkBmddc7V56BDtRsEdPWoZf4lcqh-Cg-VfVcqwH6yPoZrfLrdflpyiH1zGOFL3PvAMzBa3zjA5RwYcJMbqSsy0KUtRQ1gHII9BXlbV9trTLShQgga0l5Yfyg0bogeeYBbKlAeJsChUECf-95QklN8WnVTHKejVXm8gH6OS74nYeC67BcrWa3VpDmMW09U1kvH0ju6NgsQ"
          }
        />
      );
    } else {
      return (
        <View style={{ flexDirection: "row", alignSelf: 'flex-start', justifyContent: 'space-around', maxHeight: '100%', width: '100%' }}>
          <Image
            style={{
              width: 125,
              height: 125,
              margin: 1
            }}
            source={{
              uri:
                "https://lh3.googleusercontent.com/lr/AGWb-e4q6e8Wnc1JeLTQT8maKB5-wQL2Ci0nm3dHhbc4sQI-Yq_joTDRoeSht-ZoGqjYJQHOW7gelszruFSs1cTU5z_9W2hithZ3d_FMvhOXm1da0JwZTrm94Qfefga3jjs2TXipuFaI8Hrey4UgVuvtU_HiOVxJ9DAMbWsnVwpMKzt8Cn1hL_yoYTL3kiodNzLBMawpKmnD6a9ri1hNXucO4v4ADIjn-L2pH6AN4ZsWxtobvOE3I03DSq-nTWDL2cqHL_p05KinTr_GQt6hhTalce_C2IMbxkK2YF6dDOKyeePJ-5rqE2DEjvpyQmmDIPZFElUZclWKDI4pRJPaPpZdjvl4s_C8vM3VqATgUyW2qgJflZt3ooCWZ_EqYCStDIP9SCm4-b8iHsMaOG-5e7_v2JESdOohg3TiaBvn8CAfUU4rMps3FxyhpvVrv42wRbzVEaFjVaR-RG9fEyXFvV81j_dWYe0F0yEC1zaUapIrc42hOObY79bTcFcsC-nOU39uYkdGC5oTLxbJK0wMfdDfniMhhRoQ4E2T8Xd40M_HCW2fTqY12oP8wutZdEuIC53HvFLXhErk1A6FVL8-h3VfxC5QemTur_t2Ps2o6Tfpxi0OPfRyXJPwRMkBmddc7V56BDtRsEdPWoZf4lcqh-Cg-VfVcqwH6yPoZrfLrdflpyiH1zGOFL3PvAMzBa3zjA5RwYcJMbqSsy0KUtRQ1gHII9BXlbV9trTLShQgga0l5Yfyg0bogeeYBbKlAeJsChUECf-95QklN8WnVTHKejVXm8gH6OS74nYeC67BcrWa3VpDmMW09U1kvH0ju6NgsQ"
            }}
          />
          <Image
            style={{
              width: 125,
              height: 125,
              margin: 1
            }}
            source={{
              uri:
                "https://lh3.googleusercontent.com/lr/AGWb-e4q6e8Wnc1JeLTQT8maKB5-wQL2Ci0nm3dHhbc4sQI-Yq_joTDRoeSht-ZoGqjYJQHOW7gelszruFSs1cTU5z_9W2hithZ3d_FMvhOXm1da0JwZTrm94Qfefga3jjs2TXipuFaI8Hrey4UgVuvtU_HiOVxJ9DAMbWsnVwpMKzt8Cn1hL_yoYTL3kiodNzLBMawpKmnD6a9ri1hNXucO4v4ADIjn-L2pH6AN4ZsWxtobvOE3I03DSq-nTWDL2cqHL_p05KinTr_GQt6hhTalce_C2IMbxkK2YF6dDOKyeePJ-5rqE2DEjvpyQmmDIPZFElUZclWKDI4pRJPaPpZdjvl4s_C8vM3VqATgUyW2qgJflZt3ooCWZ_EqYCStDIP9SCm4-b8iHsMaOG-5e7_v2JESdOohg3TiaBvn8CAfUU4rMps3FxyhpvVrv42wRbzVEaFjVaR-RG9fEyXFvV81j_dWYe0F0yEC1zaUapIrc42hOObY79bTcFcsC-nOU39uYkdGC5oTLxbJK0wMfdDfniMhhRoQ4E2T8Xd40M_HCW2fTqY12oP8wutZdEuIC53HvFLXhErk1A6FVL8-h3VfxC5QemTur_t2Ps2o6Tfpxi0OPfRyXJPwRMkBmddc7V56BDtRsEdPWoZf4lcqh-Cg-VfVcqwH6yPoZrfLrdflpyiH1zGOFL3PvAMzBa3zjA5RwYcJMbqSsy0KUtRQ1gHII9BXlbV9trTLShQgga0l5Yfyg0bogeeYBbKlAeJsChUECf-95QklN8WnVTHKejVXm8gH6OS74nYeC67BcrWa3VpDmMW09U1kvH0ju6NgsQ"
            }}
          />
          <Image
            style={{
              width: 125,
              height: 125,
              margin: 1
            }}
            source={{
              uri:
                "https://lh3.googleusercontent.com/lr/AGWb-e4q6e8Wnc1JeLTQT8maKB5-wQL2Ci0nm3dHhbc4sQI-Yq_joTDRoeSht-ZoGqjYJQHOW7gelszruFSs1cTU5z_9W2hithZ3d_FMvhOXm1da0JwZTrm94Qfefga3jjs2TXipuFaI8Hrey4UgVuvtU_HiOVxJ9DAMbWsnVwpMKzt8Cn1hL_yoYTL3kiodNzLBMawpKmnD6a9ri1hNXucO4v4ADIjn-L2pH6AN4ZsWxtobvOE3I03DSq-nTWDL2cqHL_p05KinTr_GQt6hhTalce_C2IMbxkK2YF6dDOKyeePJ-5rqE2DEjvpyQmmDIPZFElUZclWKDI4pRJPaPpZdjvl4s_C8vM3VqATgUyW2qgJflZt3ooCWZ_EqYCStDIP9SCm4-b8iHsMaOG-5e7_v2JESdOohg3TiaBvn8CAfUU4rMps3FxyhpvVrv42wRbzVEaFjVaR-RG9fEyXFvV81j_dWYe0F0yEC1zaUapIrc42hOObY79bTcFcsC-nOU39uYkdGC5oTLxbJK0wMfdDfniMhhRoQ4E2T8Xd40M_HCW2fTqY12oP8wutZdEuIC53HvFLXhErk1A6FVL8-h3VfxC5QemTur_t2Ps2o6Tfpxi0OPfRyXJPwRMkBmddc7V56BDtRsEdPWoZf4lcqh-Cg-VfVcqwH6yPoZrfLrdflpyiH1zGOFL3PvAMzBa3zjA5RwYcJMbqSsy0KUtRQ1gHII9BXlbV9trTLShQgga0l5Yfyg0bogeeYBbKlAeJsChUECf-95QklN8WnVTHKejVXm8gH6OS74nYeC67BcrWa3VpDmMW09U1kvH0ju6NgsQ"
            }}
          />
        </View>
      );
    }
  }

  render() {
    let notesSection = this.notesSection();
    let photoSection = this.photoSection();

    return (
      <Screen>
        <Header title="Anything else to add?" backButton={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ noteModalVisible: true });
          }}
        >
          <CardDotted style={{ borderWidth: 1 }}>{notesSection}</CardDotted>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push("PhotosSelect", {
              moodId: this.state.mood_id,
              onGoBack: () => this.refreshPhotos()
            });
          }}
        >
          <CardDotted style={{ borderWidth: 1 }}>{photoSection}</CardDotted>
        </TouchableOpacity>

        <ActionButton buttonText={"Submit"} onPress={this.buttonSubmit} />

        <NotesModal
          moodId={this.state.mood_id}
          showModal={this.state.noteModalVisible}
          textPlaceholder={this.state.value}
          closeModal={this.closeModal}
          updateNote={this.updateNote}
        />
      </Screen>
    );
  }
}
