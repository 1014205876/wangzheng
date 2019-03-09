export default {
    etpc: {
        productId: "",
        busCer: {
            legalName: '',
            etpName: '',
            busUrl: ''
        },
        idMobileCer: {
            mobile: '',
            name: '',
            idCode: '',
            status: '',
            idUrl: '',
            idBackUrl: '',
            issuingAgency: '',
            validityPeriod: "",
            idBack: {
                issuingAgency: '',
                idBackUrl: "",
                validityPeriod: "",
                status: ''
            }
        },
        controllerCer: {
            mobile: '',
            name: '',
            idCode: '',
            status: '',
            idUrl: '',
            idBackUrl: '',
            issuingAgency: '',
            validityPeriod: '',
            idBack: {
                issuingAgency: '',
                idBackUrl: "",
                validityPeriod: "",
                status: ''
            }
        },
        cerId: ''
    },
    loan: {
        productId: "",
        productName: "",
        etpCer: {
            id: '',
            etpName: '',
            infoAuthNum: ''
        },
        amount: null,
        term: null,
        infoAuth: {
            id: '',
            infoAuthNum: '',
            authUrl: '',
            bodyUrl: '',
            controllerUrl: ''
        },
        repayMethod:"",
        stepSwitch: false
    },
    userInfo: {
        id: ''
    },
    etpNameTemp:'',
    reload: false,
    promptShow: true
}