import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  gradientBackground: {
      paddingHorizontal: 0,
      height: '100%',
      alignItems: "center"
  },
  bodyContainer: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  payTitle: {
    fontSize: 37,
    letterSpacing: -1,
    fontFamily: "Pretendard-SemiBold",
    color: "#fff",
    textAlign: 'center',
    },
  amountText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
    color: "#fff",
    textAlign: 'center',
    marginTop: '5%',
  },
  useAmountBox: {
    borderRadius: 100,
    backgroundColor: "rgba(71, 110, 212, 0.21)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    alignSelf: "center",
    marginTop: '5%',
  },
  usedAmonutText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  inoutContainer: {
    marginTop: '7%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inoutBox: {
    borderRadius: 9,
    backgroundColor: "rgba(71, 110, 212, 0.21)",
    paddingHorizontal: 55,
    paddingVertical: 7,
    alignSelf: "center",
    marginHorizontal: 3,
  },
  inoutText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  QRcodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  payCardContainer: {
    alignItems: 'center', 
    marginTop: '10%', 
    position: 'relative', 
  },
  greyCookieWrapper: {
    position: 'absolute',
    zIndex: 1,
    right: 50,
    top: 70,
  },
  payCardWrapper: {
    position: 'absolute',
    zIndex: 2,
    paddingLeft: 12,
  },
  linkButtonContainer: {
    marginTop: 180,        // payCard 밑에 충분한 공간을 확보
    alignItems: 'center',  // 중앙 정렬
  },
});
