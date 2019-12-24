import React from "react";
import { Modal, TouchableOpacity, Image, View } from "react-native";
import {
  SmallHeading,
  ModalView,
  ModalFull,
  ButtonAccept,
  ButtonDecline,
  ButtonTextSmall
} from "../css/designSystem";
import Database from "../Database";
import GooglePhoto from "../components/GooglePhoto"
import * as Google from "expo-google-app-auth";

class PhotosModal extends React.Component {
  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      user: null,
      photos: null
    };
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={() => {
          this.props.closeModal("photos");
        }}
      >
        <ModalView>
          <ModalFull>
            <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <GooglePhoto uri="https://lh3.googleusercontent.com/lr/AGWb-e4RmZ276xU1W4YNZuDWe-4CzLZUOE2dIvx-DMUskGQOIHDHc9Fy1Q4Hx5_TUHKq05yvBIzG3stOlQrMPgA9UixpkSUS-lo0qpQb63EmIGlgNmnEY4Ol9MDlw53QeaBRLV8-Q005wBUL_iLaC2XBnsSxQeagf63Dk6c8Tt--K4hJ26MuL7NvxZ8OZCG9PQy6xugYRHlx9OdZ4QXlGjGegJfesdhs7xQlHGRYEj_OPaNJ8g4F6M68F6lgsIEYdFTONry5wK4mIwI8_Uhoxo82PM-zr4EDjZ6bYCLgkbGU5iNSK024d7tpkuv6Q3bMxkKwGL16NdnB4MOOHbcnDcLCYEMU1DW1sC1sjCRlbt3O08Hp1cm2B3TMxysfbPqTiM25KxjU5nEZ5cWTAHOzz7JjuHOI4GvW-Lcr8SBtVaVZu6lA8NU3wkH6RImskBlCpehR7fjbkz7pKcFey3sai3Eowy7NPr491lPXF0XKEncUzuouZnUJbEK_b6f74-vUqbMFzvf5qNlhfJ6v1BwbjBCvdD4EEPnvj-dmvHdPlPpaKDVk35YZzAJsq93yFtASVRsynelTb67BtOPEfrOBllVkLj_WUsnnHbC0kuhHLiTiFKfb5YotJcymIg5m9Haopxgdkdr_x5b-W6sY-SQwQPfXttfXoQNvO2Hb6Jak4OzmuC-dxMf_3uPeqpVcQ-p0gFFC230Y6VtZkt9pLaY3zQ6qdpIdgeej2SVYI-fuJ-RQs_5e0Is3v8b412Kqh-MXeBOyJYde-8eSV6c9hYpx"/>
              <GooglePhoto uri="https://lh3.googleusercontent.com/lr/AGWb-e4RmZ276xU1W4YNZuDWe-4CzLZUOE2dIvx-DMUskGQOIHDHc9Fy1Q4Hx5_TUHKq05yvBIzG3stOlQrMPgA9UixpkSUS-lo0qpQb63EmIGlgNmnEY4Ol9MDlw53QeaBRLV8-Q005wBUL_iLaC2XBnsSxQeagf63Dk6c8Tt--K4hJ26MuL7NvxZ8OZCG9PQy6xugYRHlx9OdZ4QXlGjGegJfesdhs7xQlHGRYEj_OPaNJ8g4F6M68F6lgsIEYdFTONry5wK4mIwI8_Uhoxo82PM-zr4EDjZ6bYCLgkbGU5iNSK024d7tpkuv6Q3bMxkKwGL16NdnB4MOOHbcnDcLCYEMU1DW1sC1sjCRlbt3O08Hp1cm2B3TMxysfbPqTiM25KxjU5nEZ5cWTAHOzz7JjuHOI4GvW-Lcr8SBtVaVZu6lA8NU3wkH6RImskBlCpehR7fjbkz7pKcFey3sai3Eowy7NPr491lPXF0XKEncUzuouZnUJbEK_b6f74-vUqbMFzvf5qNlhfJ6v1BwbjBCvdD4EEPnvj-dmvHdPlPpaKDVk35YZzAJsq93yFtASVRsynelTb67BtOPEfrOBllVkLj_WUsnnHbC0kuhHLiTiFKfb5YotJcymIg5m9Haopxgdkdr_x5b-W6sY-SQwQPfXttfXoQNvO2Hb6Jak4OzmuC-dxMf_3uPeqpVcQ-p0gFFC230Y6VtZkt9pLaY3zQ6qdpIdgeej2SVYI-fuJ-RQs_5e0Is3v8b412Kqh-MXeBOyJYde-8eSV6c9hYpx"/>
              <GooglePhoto uri="https://lh3.googleusercontent.com/lr/AGWb-e4RmZ276xU1W4YNZuDWe-4CzLZUOE2dIvx-DMUskGQOIHDHc9Fy1Q4Hx5_TUHKq05yvBIzG3stOlQrMPgA9UixpkSUS-lo0qpQb63EmIGlgNmnEY4Ol9MDlw53QeaBRLV8-Q005wBUL_iLaC2XBnsSxQeagf63Dk6c8Tt--K4hJ26MuL7NvxZ8OZCG9PQy6xugYRHlx9OdZ4QXlGjGegJfesdhs7xQlHGRYEj_OPaNJ8g4F6M68F6lgsIEYdFTONry5wK4mIwI8_Uhoxo82PM-zr4EDjZ6bYCLgkbGU5iNSK024d7tpkuv6Q3bMxkKwGL16NdnB4MOOHbcnDcLCYEMU1DW1sC1sjCRlbt3O08Hp1cm2B3TMxysfbPqTiM25KxjU5nEZ5cWTAHOzz7JjuHOI4GvW-Lcr8SBtVaVZu6lA8NU3wkH6RImskBlCpehR7fjbkz7pKcFey3sai3Eowy7NPr491lPXF0XKEncUzuouZnUJbEK_b6f74-vUqbMFzvf5qNlhfJ6v1BwbjBCvdD4EEPnvj-dmvHdPlPpaKDVk35YZzAJsq93yFtASVRsynelTb67BtOPEfrOBllVkLj_WUsnnHbC0kuhHLiTiFKfb5YotJcymIg5m9Haopxgdkdr_x5b-W6sY-SQwQPfXttfXoQNvO2Hb6Jak4OzmuC-dxMf_3uPeqpVcQ-p0gFFC230Y6VtZkt9pLaY3zQ6qdpIdgeej2SVYI-fuJ-RQs_5e0Is3v8b412Kqh-MXeBOyJYde-8eSV6c9hYpx"/>
              <GooglePhoto uri="https://lh3.googleusercontent.com/lr/AGWb-e4RmZ276xU1W4YNZuDWe-4CzLZUOE2dIvx-DMUskGQOIHDHc9Fy1Q4Hx5_TUHKq05yvBIzG3stOlQrMPgA9UixpkSUS-lo0qpQb63EmIGlgNmnEY4Ol9MDlw53QeaBRLV8-Q005wBUL_iLaC2XBnsSxQeagf63Dk6c8Tt--K4hJ26MuL7NvxZ8OZCG9PQy6xugYRHlx9OdZ4QXlGjGegJfesdhs7xQlHGRYEj_OPaNJ8g4F6M68F6lgsIEYdFTONry5wK4mIwI8_Uhoxo82PM-zr4EDjZ6bYCLgkbGU5iNSK024d7tpkuv6Q3bMxkKwGL16NdnB4MOOHbcnDcLCYEMU1DW1sC1sjCRlbt3O08Hp1cm2B3TMxysfbPqTiM25KxjU5nEZ5cWTAHOzz7JjuHOI4GvW-Lcr8SBtVaVZu6lA8NU3wkH6RImskBlCpehR7fjbkz7pKcFey3sai3Eowy7NPr491lPXF0XKEncUzuouZnUJbEK_b6f74-vUqbMFzvf5qNlhfJ6v1BwbjBCvdD4EEPnvj-dmvHdPlPpaKDVk35YZzAJsq93yFtASVRsynelTb67BtOPEfrOBllVkLj_WUsnnHbC0kuhHLiTiFKfb5YotJcymIg5m9Haopxgdkdr_x5b-W6sY-SQwQPfXttfXoQNvO2Hb6Jak4OzmuC-dxMf_3uPeqpVcQ-p0gFFC230Y6VtZkt9pLaY3zQ6qdpIdgeej2SVYI-fuJ-RQs_5e0Is3v8b412Kqh-MXeBOyJYde-8eSV6c9hYpx"/>
              <GooglePhoto uri="https://lh3.googleusercontent.com/lr/AGWb-e4RmZ276xU1W4YNZuDWe-4CzLZUOE2dIvx-DMUskGQOIHDHc9Fy1Q4Hx5_TUHKq05yvBIzG3stOlQrMPgA9UixpkSUS-lo0qpQb63EmIGlgNmnEY4Ol9MDlw53QeaBRLV8-Q005wBUL_iLaC2XBnsSxQeagf63Dk6c8Tt--K4hJ26MuL7NvxZ8OZCG9PQy6xugYRHlx9OdZ4QXlGjGegJfesdhs7xQlHGRYEj_OPaNJ8g4F6M68F6lgsIEYdFTONry5wK4mIwI8_Uhoxo82PM-zr4EDjZ6bYCLgkbGU5iNSK024d7tpkuv6Q3bMxkKwGL16NdnB4MOOHbcnDcLCYEMU1DW1sC1sjCRlbt3O08Hp1cm2B3TMxysfbPqTiM25KxjU5nEZ5cWTAHOzz7JjuHOI4GvW-Lcr8SBtVaVZu6lA8NU3wkH6RImskBlCpehR7fjbkz7pKcFey3sai3Eowy7NPr491lPXF0XKEncUzuouZnUJbEK_b6f74-vUqbMFzvf5qNlhfJ6v1BwbjBCvdD4EEPnvj-dmvHdPlPpaKDVk35YZzAJsq93yFtASVRsynelTb67BtOPEfrOBllVkLj_WUsnnHbC0kuhHLiTiFKfb5YotJcymIg5m9Haopxgdkdr_x5b-W6sY-SQwQPfXttfXoQNvO2Hb6Jak4OzmuC-dxMf_3uPeqpVcQ-p0gFFC230Y6VtZkt9pLaY3zQ6qdpIdgeej2SVYI-fuJ-RQs_5e0Is3v8b412Kqh-MXeBOyJYde-8eSV6c9hYpx"/>

            </View>

            <TouchableOpacity
              onPress={() => {
                this._toggleAuth();
              }}
              style={{ marginLeft: "50%" }}
            >
              <ButtonDecline>
                <ButtonTextSmall style={{ color: "#1B4751" }}>
                  Sign in
                </ButtonTextSmall>
              </ButtonDecline>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.closeModal("photos");
              }}
            >
              <ButtonAccept>
                <ButtonTextSmall>Save</ButtonTextSmall>
              </ButtonAccept>
            </TouchableOpacity>
          </ModalFull>
        </ModalView>
      </Modal>
    );
  }
}

export default PhotosModal;
