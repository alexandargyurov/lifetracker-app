export const style = {
    width: "100%",
    height: 325,
    backgroundColor: "#FEF1E0",
    borderRadius: 10
  }

export const theme = {
    calendarBackground: "#FEF1E0",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#707070",
    dayTextColor: "#1B4751",
    monthTextColor: "#1B4751",
    textDayFontFamily: "europaLight",
    textMonthFontFamily: "europaRegular",
    textDayHeaderFontFamily: "europaLight",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
    "stylesheet.calendar.main": {
      container: {
        margin: 0
      },
      week: {
        marginTop: 2,
        marginBottom: 2,
        flexDirection: "row"
      }
    },
    "stylesheet.calendar-list.main": {
      container: {
        margin: 0,
        padding: 0
      },
      calendar: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 350
      }
    },
    "stylesheet.day.single": {
      base: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.25,
        borderRadius: 2,
        borderColor: "#707070",
        opacity: 20
      },
      text: {
        color: "#1B4751",
        fontSize: 14
      }
    }
  }