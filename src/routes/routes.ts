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
import ColorList from "../screen/BottomTab/Dashboard/ColorList";
import CreatePin from "../screen/BottomTab/Dashboard/CreatePIN/CreatePin";
import LoanForm from "../screen/BottomTab/Dashboard/LoanForm";
import SubmittingScreen from "../screen/BottomTab/Dashboard/SubmittingScreen";
import ProductDetailScreen from "../screen/BottomTab/ProductDetail/ProductDetails";
import DocumentScreen from "../screen/BottomTab/ProfileTab/DocumentScreen";
import OrderDetail from "../screen/BottomTab/ProfileTab/OrderDetail";
import OrderList from "../screen/BottomTab/ProfileTab/OrderHistory";
import ConfirmSwapScreen from "../screen/BottomTab/swap/ConfirmSwap";
import About from "../screen/Profile/LegalPoliciesScreen";
import NotificationsSetting from "../screen/Profile/NotificationsSetting";
import Policy from "../screen/Profile/Policy";
import UserDetailsScreen from "../screen/Profile/UserDetailsScreen";
import ScreenNameEnum from "./screenName.enum";
import EarnDetail from "../screen/BottomTab/Earn/EarnDetail";
import ChangePasswordScreen from "../screen/Profile/ChangePassword";
import DonationScreen from "../screen/BottomTab/Dashboard/Donation";
import DonationDetailScreen from "../screen/BottomTab/Dashboard/DonationDetail";
import DonationTrackingDetail from "../screen/BottomTab/Dashboard/TrackingDetail";
import PaymentDetails from "../screen/BottomTab/Dashboard/Donation/PaymentDetail";
import Notification from "../screen/Profile/Notification";
import CurrencyScreen from "../screen/Profile/Currency";
import FAQScreen from "../screen/Profile/FAQ";

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

    {
      name: ScreenNameEnum.BottomTabs,
      Component: BottomTabs,
    },
    {
      name: ScreenNameEnum.CreatePin,
      Component: CreatePin,
    },
    {
      name: ScreenNameEnum.ProductDetailScreen,
      Component: ProductDetailScreen,
    },
    {
      name: ScreenNameEnum.colorList,
      Component: ColorList,
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
      name: ScreenNameEnum.LoanForm,
      Component: LoanForm,
    },
    {
      name: ScreenNameEnum.SubmittingScreen,
      Component: SubmittingScreen,
    },
    {
      name: ScreenNameEnum.personalInfo,
      Component: UserDetailsScreen,
    },
    {
      name: ScreenNameEnum.OrederList,
      Component: OrderList,
    },
    {
      name: ScreenNameEnum.OrderDetail,
      Component: OrderDetail,
    },
    {
      name: ScreenNameEnum.language,
      Component: CurrencyScreen,
    },
    {
      name: ScreenNameEnum.DocumentScreen,
      Component: DocumentScreen,
    },
    {
      name: ScreenNameEnum.About,
      Component: About,
    },
    {
      name: ScreenNameEnum.Policy,
      Component: Policy,
    },
    {
      name: ScreenNameEnum.changePassword,
      Component: ChangePasswordScreen,
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
      name: 'chooseLocation',
      Component: ChooseLocation,
    },
  ],
};

export default _routes;
