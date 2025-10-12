import { base_url } from './index';
import ScreenNameEnum from '../routes/screenName.enum';
import { loginSuccess } from '../redux/feature/authSlice';
import { errorToast, successToast } from '../utils/customToast';
import { getSuccess } from '../redux/feature/featuresSlice';
import { MapApiKey } from '../redux/Api';

const LoginCustomer = (
    param: any,
    setLoading: (loading: boolean) => void,
    dispatch: any) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": param?.email,
            "password": param?.password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        // console.log(param)
        const respons = fetch(`${base_url}user/login`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    setLoading(false)
                    console.log(response)
                    // successToast(
                    //     response?.message
                    // );
                    dispatch(loginSuccess({ userData: response?.data, token: response?.data?.token, }));
                    if (response?.data?.isPinCreated == true) {
                        param?.navigation.navigate(ScreenNameEnum.VerifyPin)
                    } else {
                        param?.navigation.navigate(ScreenNameEnum.LocationAllow)

                    }
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const LoginWithGoogleCustomer = (
    param: any,
    setLoading: (loading: boolean) => void,
    dispatch: any) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": param?.email,
            "password": param?.password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            // body: raw,
        };
        // console.log(param)
        const respons = fetch(`${base_url}google-auth/user/login/${param?.gtoken}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    setLoading(false)
                    console.log(response)
                    // successToast(
                    //     response?.message
                    // );
                    dispatch(loginSuccess({ userData: response?.data, token: response?.data?.token, }));
                    if (response?.data?.isPinCreated == true) {
                        param?.navigation.navigate(ScreenNameEnum.VerifyPin)
                    } else {
                        param?.navigation.navigate(ScreenNameEnum.LocationAllow)

                    }
                    console.log(response)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const SinupCustomer = (params: any,
    setLoading: (loading: boolean) => void,) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fullName": params?.fname,
            "email": params?.email,
            "phone": params?.phone,
            "password": params?.password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        // console.log(formdata)
        const respons = fetch(`${base_url}user/register`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    // successToast(
                    //     response?.message
                    // );
                    console.log(response)
                    params?.navigation.navigate(ScreenNameEnum.OtpScreen, { from: 'signup', email: params.email })
                    // params.navigation.navigate(ScreenNameEnum.LoginScreen);
                    return response
                } else {
                    errorToast(
                        response.message,
                    );
                    console.log(response)

                    return response
                }
            })
            .catch((error) => console.error(error));
        return respons
    } catch (error) {
        errorToast(
            'Network error',
        );
    }
};

const SinupGoogleCustomer = (params: any,
    setLoading: (loading: boolean) => void,) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fullName": params?.fname,
            "email": params?.email,
            "phone": params?.phone,
            "password": params?.password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            // body: raw,
        };
        // console.log(formdata)
        const respons = fetch(`${base_url}google-auth/user/register/${params.gtoken}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    successToast(
                        response?.message
                    );
                    console.log(response)
                    LoginWithGoogleCustomer(params, setLoading, params.dispatch)
                    // params?.navigation.navigate(ScreenNameEnum.LoginScreen)
                    // params.navigation.navigate(ScreenNameEnum.LoginScreen);
                    return response
                } else {
                    errorToast(
                        response.message,
                    );
                    console.log(response)
                    setLoading(false)
                    return response
                }
            })
            .catch((error) => console.error(error));
        return respons
    } catch (error) {
        errorToast(
            'Network error',
        );
        setLoading(false)

    }
};


const restEmailOtpScreen = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        // const formdata = new FormData();
        // formdata.append("email", param?.email || param?.mobile);
        // formdata.append("type", param?.type);
        // console.log(formdata)

        const raw = JSON.stringify({
            "email": param?.email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const respons = fetch(`${base_url}user/forgot-password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    param.navigation.navigate(ScreenNameEnum.OtpScreen, {
                        email: param?.email,
                        from: param?.type
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    console.log(response)
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const otp_Verify = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": param?.email,
            "otp": param?.otp,
            "purpose": param.from == "signup" ? "verify" : "password"
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const respons = fetch(`${base_url}user/verify-otp`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                console.log(response, "respons")
                if (response.statusCode == 200) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    if (param.from == "signup") {
                        param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    } else {
                        param.navigation.navigate(ScreenNameEnum.CreatePassword, {
                            email: param?.email
                        })
                    }
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const updatePassword = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": param?.email,
            "password": param?.password,
            "confirmPassword": param?.password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const respons = fetch(`${base_url}user/reset-password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const CreateLoginPin = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", param?.token);

        const raw = JSON.stringify({
            "pin": param?.pin,
            "confirmPin": param?.cpin
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const respons = fetch(`${base_url}user/create-pin`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    param.navigation.replace(ScreenNameEnum.BottomTabs)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const VerifyLoginPin = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", param?.token);

        const raw = JSON.stringify({
            "pin": param?.pin,
            // "confirmPin": param?.cpin
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const respons = fetch(`${base_url}user/verify-pin`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.statusCode == 200) {
                    setLoading(false)
                    // successToast(
                    //     response?.message
                    // );
                    param.navigation.replace(ScreenNameEnum.BottomTabs)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const Fetch_CointAPI = async (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("x-cg-demo-api-key", "CG-K2sv8oGmXdaEGa7PmQ4nCzpt");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Fetch both GTAN token and top tokens in parallel
        const [gtanResponse, tokensResponse] = await Promise.all([
            fetch(`https://api.coingecko.com/api/v3/coins/giant-token`, requestOptions),
            fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`,
                requestOptions
            ),
        ]);

        const [gtanData, tokensData] = await Promise.all([
            gtanResponse.json(),
            tokensResponse.json(),
        ]);

        setLoading(false);

        // Some CoinGecko endpoints return single object vs. array → normalize
        // const gtanItem = gtanData?.id ? gtanData : null;

        const gtanItem = {
            id: gtanData.id,
            symbol: gtanData.symbol,
            name: gtanData.name,
            image: gtanData.image?.thumb,
            current_price: gtanData.market_data?.current_price?.usd || 0,
            price_change_percentage_24h: gtanData.market_data?.price_change_percentage_24h || 0,
        };
        const tokens = Array.isArray(tokensData) ? tokensData : [];

        // Remove GTAN from tokens if it already exists (avoid duplication)
        const filteredTokens = tokens.filter((t) => t.id !== "giant-token");
        console.log(gtanItem)
        // Final array with GTAN at the top
        return gtanItem ? [gtanItem, ...filteredTokens] : filteredTokens;
    } catch (error) {
        setLoading(false);
        console.error("Network error", error);
        errorToast("Network error");
        throw error;
    }
};


const Policies_Api = (
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = fetch(`${base_url}/privacy-policy.php`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("----response", response)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const EditProfile_Api = (
    param: any,
    setLoading: (loading: boolean) => void,
    navigation: any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", param?.token);

        const formData = new FormData();
        if (param.images) {
            formData.append("image", {
                uri: param.images.path,          // Make sure param.image.path is a valid file URI
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("fullName", param?.name);
        // formData.append("last_name", param?.last_name);
        // formData.append("user_id", param?.userId);
        // formData.append("license_date", param?.date ?? null);
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: formData,
        };
        console.log(formData)
        const respons = fetch(`${base_url}user/update-profile`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.statusCode == 200) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // getSuccess({
                    //     userGetData: response.result,
                    // })
                    console.log(response)

                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const GetUserApi = async (params: any, setLoading: (loading: boolean) => void, dispatch: any) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", params?.token);
        // const formdata = new FormData();
        // formdata.append("user_id", params);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            // body: formdata,
        };
        const response = await fetch(`${base_url}user/my-profile`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 200) {
            setLoading(false)
            dispatch(loginSuccess({ userData: responseData?.data, token: params?.token }));
            return responseData.data;
        } else {
            errorToast(responseData.message);
            setLoading(false)

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}



const GetFoundationApi = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", params?.token);
        // const formdata = new FormData();
        // formdata.append("user_id", params);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            // body: formdata,
        };
        const response = await fetch(`${base_url}admin/foundation`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 200) {
            setLoading(false)
            return responseData.data;
        } else {
            errorToast(responseData.message);
            setLoading(false)
        }
    } catch (error) {
        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}
const GetCompaignAPI = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmU4NWZkNTVkYTYxY2ZkOWJjYWE2MCIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5uQHlvcG1haWwuY29tIiwiaWF0IjoxNzU4ODg1NDgzLCJleHAiOjE3NjE0Nzc0ODN9.v0MTJPtRVQc6hLx4RIBK90AtrezXtPMzYIW6fk23G3I");
        // const formdata = new FormData();
        // formdata.append("user_id", params);

        const raw = JSON.stringify({
            "foundationId": "68dbc9ff08fa292f7f00cbe0",
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(`${base_url}admin/campaigns`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 200) {
            setLoading(false)
            return responseData;
        } else {
            errorToast(responseData.message);
            setLoading(false)
            return responseData;

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        console.log(error)

        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}

const GetAllTokenAPI = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params?.token}`);
        // const formdata = new FormData();
        // formdata.append("user_id", params);

        //         const raw = JSON.stringify({
        //     "contractAddress": params?.address,
        //     "rpcUrl": params?.rpc
        // });
        // console.log(raw)
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            // body: raw,
        };
        const response = await fetch(`${base_url}token/all`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 200) {
            setLoading(false)
            return responseData;
        } else {
            errorToast(responseData.message);
            setLoading(false)
            return responseData;

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        console.log(error)

        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}



const GetAllNetworkAPI = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params?.token}`);
        // const formdata = new FormData();
        // formdata.append("user_id", params);

        //         const raw = JSON.stringify({
        //     "contractAddress": params?.address,
        //     "rpcUrl": params?.rpc
        // });
        // console.log(raw)
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            // body: raw,
        };
        const response = await fetch(`${base_url}network`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 200) {
            setLoading(false)
            return responseData;
        } else {
            errorToast(responseData.message);
            setLoading(false)
            return responseData;

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        console.log(error)

        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}

const GetTokenDetailAPI = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        //  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmU4NWZkNTVkYTYxY2ZkOWJjYWE2MCIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5uQHlvcG1haWwuY29tIiwiaWF0IjoxNzU4ODg1NDgzLCJleHAiOjE3NjE0Nzc0ODN9.v0MTJPtRVQc6hLx4RIBK90AtrezXtPMzYIW6fk23G3I");
        // const formdata = new FormData();
        // formdata.append("user_id", params);

        const raw = JSON.stringify({
            "contractAddress": params?.address,
            "rpcUrl": params?.rpc
        });
        console.log(raw)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(`${base_url}token/details`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 201) {
            setLoading(false)
            successToast(responseData.message)
            return responseData;
        } else {
            errorToast(responseData.message);
            setLoading(false)
            return responseData;

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        console.log(error)

        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}


const AddCustomTokenAPI = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params?.token}`);
        // const formdata = new FormData();
        // formdata.append("user_id", params);

        const raw = JSON.stringify({
            "chainId": params?.chainId,
            "contractAddress": params?.address,
            "symbol": params?.symbol,
            "decimals": params?.number,
            "name": params?.name
        }
        );
        console.log(raw)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(`${base_url}token/submit`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 201) {
            setLoading(false)
            successToast(responseData.message)
            return responseData;
        } else {
            errorToast(responseData.message);
            setLoading(false)
            return responseData;

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        console.log(error)

        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}

const AddCustomNetworkAPI = async (params: any, setLoading: (loading: boolean) => void) => {
    // const dispatch = useDispatch()
    try {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params?.token}`);
        // const formdata = new FormData();
        // formdata.append("user_id", params);

        const raw = JSON.stringify({
            "chainId": params?.chainId,
            "blockExplorerUrl": params?.explorerUrl,
            "rpcUrl": params?.rpcUrl,
            "name": params?.networkName,
            "nativeCurrency":{
                "symbol":params?.symbol
            }
        }
        );
        console.log(raw)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(`${base_url}network`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        console.log(responseData)
        if (responseData.statusCode === 201) {
            setLoading(false)
            successToast(responseData.message)
            return responseData;
        } else {
            errorToast(responseData.message);
            setLoading(false)
            return responseData;

            //   return thunkApi.rejectWithValue(responseData);
        }
    } catch (error) {
        console.log(error)

        errorToast('Network error');
        setLoading(false)

        // return thunkApi.rejectWithValue(error);
    }
}
const Support_Api = (
    supportHelp: any,
    setLoading: (loading: boolean) => void,
    id: any,
    navigation: any
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", id);
        formData.append("message", supportHelp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = fetch(`${base_url}/create-support-inquiries`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    navigation.goBack();
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const ChangePass_Api = (
    data: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", data?.token);
        myHeaders.append("Content-Type", "application/json");
        // const formData = new FormData();
        // formData.append("oldPassword", data?.oldpassw);
        // formData.append("newPassword", data?.password);
        // formData.append("confirmPassword", data?.confirmPassword);
        const raw = JSON.stringify({
            "oldPassword": data?.oldpassw,
            "newPassword": data?.password,
            "confirmPassword": data?.confirmPassword
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
        };
        const respons = fetch(`${base_url}user/change-password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)

                if (response?.statusCode == 200) {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    return response
                } else {
                    setLoading(false);
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                setLoading(false));


        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const Get_Notification_Api = async (
    setLoading: (loading: boolean) => void,
    id: string
) => {
    setLoading(true); // Start loading
    try {
        const requestOptions = {
            method: "GET",
        };
        const response = await fetch(`${base_url}/get_post?user_id=${id}`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        setLoading(false);
        // Check API response status
        if (responseData.status === "1") {
        } else {
            errorToast(responseData.error);
        }
        return responseData; // ✅ Return correct response object
    } catch (error) {
        errorToast("Network error");
        return null; // Return null in case of failure
    } finally {
        setLoading(false); // Stop loading regardless of success or failure
    }
};
export {
    GetUserApi,
    Get_Notification_Api, SinupCustomer,
    Support_Api, Policies_Api,
    ChangePass_Api, EditProfile_Api, updatePassword,
    restEmailOtpScreen, LoginCustomer, otp_Verify,
    CreateLoginPin, VerifyLoginPin,
    Fetch_CointAPI, GetFoundationApi, GetCompaignAPI,
    LoginWithGoogleCustomer, SinupGoogleCustomer,
    GetTokenDetailAPI,
    GetAllTokenAPI,
    AddCustomTokenAPI,
    GetAllNetworkAPI,
    AddCustomNetworkAPI

}  