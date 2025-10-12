import ChooseLocation from "../helper/ChooseLocation";
import BottomTabs from "../navigators/TabNavigator";
import ChooseRoleScreen from "../screen/auth/ChooseRoleScreen/ChooseRoleScreen";
import CreatePassword from "../screen/auth/CreateNewPassword/CreateNewPassword";
import LocationAllow from "../screen/auth/LocationAllow/LocationAllow";
import Login from "../screen/auth/Login/Login";
import OnboardingScreen from "../screen/auth/Onboarding";
import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import PasswordReset from "../screen/auth/PasswordReset/PasswordReset";
import SignUp from "../screen/auth/Signup/SignUp";
import Splash from "../screen/auth/Splash";
import CreatePin from "../screen/BottomTab/Dashboard/CreatePIN/CreatePin";
import ConfirmSwapScreen from "../screen/BottomTab/swap/ConfirmSwap";
import NotificationsSetting from "../screen/Profile/NotificationsSetting";
import ScreenNameEnum from "./screenName.enum";
import EarnDetail from "../screen/BottomTab/Earn/EarnDetail";
import DonationScreen from "../screen/BottomTab/Dashboard/Donation";
import DonationDetailScreen from "../screen/BottomTab/Dashboard/DonationDetail";
import DonationTrackingDetail from "../screen/BottomTab/Dashboard/TrackingDetail";
import PaymentDetails from "../screen/BottomTab/Dashboard/Donation/PaymentDetail";
import Notification from "../screen/Profile/Notification";
import FAQScreen from "../screen/Profile/FAQ";
import BuyScreen from "../screen/BottomTab/Dashboard/Buy/Buy";
import SellScreen from "../screen/BottomTab/Dashboard/Sell/Sell";
import BuyDetailScreen from "../screen/BottomTab/Dashboard/Buy/BuyDetail";
import SendEth from "../screen/BottomTab/Dashboard/Buy/SendEth";
import SellDetailScreen from "../screen/BottomTab/Dashboard/Sell/SellDetail";
import SendScreen from "../screen/BottomTab/Dashboard/Buy/send";
import sendPayment from "../screen/BottomTab/Dashboard/Buy/sendPayment";
import confirmPayment from "../screen/BottomTab/Dashboard/Buy/confirmPayment";
import PrivacyPolicy from "../screen/Profile/PrivacyPolicy";
import CreatePinConfirm from "../screen/BottomTab/Dashboard/CreatePIN/CreatePinConfirm";
import EditProfile from "../screen/Profile/EditProfile";
import ChangePasswordScreen from "../screen/Profile/ChangePassword";
import CurrencyScreen from "../screen/Profile/Currency";
import AboutUs from "../screen/Profile/AboutUs";
import ImportWallet from "../screen/BottomTab/Dashboard/ImportWallet";
import VerifyPin from "../screen/BottomTab/Dashboard/CreatePIN/VerifyPin";
import CointDetail from "../screen/BottomTab/Dashboard/CointDetail";
import TokenPinScreen from "../screen/Profile/tokenPin";
import ImportTokenScreen from "../screen/Profile/ImportToken";
import ImportCustomTokenScreen from "../screen/Profile/ImportCustomNetwork";

const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },

    {
      name: ScreenNameEnum.SignUpScreen,
      Component: SignUp,
    },

    {
      name: ScreenNameEnum.LoginScreen,
      Component: Login,
    },

    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },

    {
      name: ScreenNameEnum.ChooseRoleScreen,
      Component: ChooseRoleScreen,
    },
    {
      name: ScreenNameEnum.NotificationsSetting,
      Component: NotificationsSetting,
    },
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.CreatePassword,
      Component: CreatePassword,
    },
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },
    {
      name: ScreenNameEnum.LocationAllow,
      Component: LocationAllow,
    },
//Profile 
    {
      name: ScreenNameEnum.EditProfile,
      Component: EditProfile,
    },
    {
      name: ScreenNameEnum.changePassword,
      Component: ChangePasswordScreen,
    },
    {
      name: ScreenNameEnum.language,
      Component: CurrencyScreen,
    },
    {
      name: ScreenNameEnum.About,
      Component: AboutUs,
    },
    {
      name: ScreenNameEnum.PrivacyPolicy,
      Component: PrivacyPolicy,
    },
    {
      name: ScreenNameEnum.BottomTabs,
      Component: BottomTabs,
    },
    {
      name: ScreenNameEnum.CreatePin,
      Component: CreatePin,
    },
    {
      name: ScreenNameEnum.CreatePinConfirm,
      Component: CreatePinConfirm,
    },
    {
      name: ScreenNameEnum.VerifyPin,
      Component: VerifyPin,
    },
    {
      name: ScreenNameEnum.importWallet,
      Component: ImportWallet,
    },
    {
      name: ScreenNameEnum.cointDetail,
      Component: CointDetail,
    },
    {
      name: ScreenNameEnum.ConfirmSwapScreen,
      Component: ConfirmSwapScreen,
    },
    {
      name: ScreenNameEnum.EarnDetail,
      Component: EarnDetail,
    },
    {
      name: ScreenNameEnum.TokenPinScreen,
      Component: TokenPinScreen,
    },
    {
      name: ScreenNameEnum.ImportCustomTokenScreen,
      Component: ImportCustomTokenScreen,
    },
    {
      name: ScreenNameEnum.ImportTokenScreen,
      Component: ImportTokenScreen,
    },
   
    {
      name: ScreenNameEnum.DonationScreen,
      Component: DonationScreen,
    },
    {
      name: ScreenNameEnum.DonationDetail,
      Component: DonationDetailScreen,
    },
    {
      name: ScreenNameEnum.DonationTrackingDetail,
      Component: DonationTrackingDetail,
    },
    {
      name: ScreenNameEnum.PaymentDetails,
      Component: PaymentDetails,
    },
    {
      name: ScreenNameEnum.Notification,
      Component: Notification,
    },
    {
      name: ScreenNameEnum.FAQScreen,
      Component: FAQScreen,
    },
    {
      name: ScreenNameEnum.BuyScreen,
      Component: BuyScreen,
    },
     {
      name: ScreenNameEnum.SellScreen,
      Component: SellScreen,
    },
      {
      name: ScreenNameEnum.BuyDetail,
      Component: BuyDetailScreen,
    },
      {
      name: ScreenNameEnum.SendEth,
      Component: SendEth,
    },
      {
      name: ScreenNameEnum.SellDetail,
      Component: SellDetailScreen,
    },
        {
      name: ScreenNameEnum.SendScreen,
      Component: SendScreen,
    },
        {
      name: ScreenNameEnum.sendPayment,
      Component: sendPayment,
    },
        {
      name: ScreenNameEnum.confirmPayment,
      Component: confirmPayment,
    },
    {
      name: 'chooseLocation',
      Component: ChooseLocation,
    },
  ],
};

export default _routes;
