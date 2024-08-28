
export const initialState = {
    InforContaUser:null,
    InforUsers:null,
    InforArea:null,
    InforEmp:null,
    InforConf:null,
    ConfigApp:null,
    SegAnun:null,
    SegEmp:null,
    SegPes:null,
    SubSegPes:null,
    TicketUser:null,
    nome: '',
    fotoPerfil:'',
    redeSocial:{},
    id:'',
    status:0,
    nomeCompleto:'',
    telefone:'',
    data_nasc:'',
    lat: null,
    log: null,
    idoc: '',
    variTemp:'',
    cidade:'',
    estado:'',
    area:0,
    regiao:'',
    grupo:{},
    idArea:"",
    IdCli:"",
    DatAti:0,
    IdReg:"",
    versao:"1.4.5",
    versaoBanco:{},
    Noti:0,
    QN2:0,
    QN3:0,
    QN4:0,
    LinkWhats:"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE",
    JogosApos:0
};

export const UserReducer = (state, action) => {
    switch(action.type) {
        case 'setJogosApos':
            return { ...state, JogosApos: action.payload.JogosApos };
        break;
        case 'setQN4':
            return { ...state, QN4: action.payload.QN4 };
        break;
        case 'setQN3':
            return { ...state, QN3: action.payload.QN3 };
        break;
        case 'setQN2':
            return { ...state, QN2: action.payload.QN2 };
        break;
        case 'setVersaoBanco':
            return { ...state, versaoBanco: action.payload.versaoBanco };
        break;
        case 'setNoti':
            return { ...state, Noti: action.payload.Noti };
        break;
        case 'setTicketUser':
            return { ...state, TicketUser: action.payload.TicketUser };
        break;
        case 'setInforContaUser':
            return { ...state, InforContaUser: action.payload.InforContaUser };
        break;
        case 'setSubSegPes':
            return { ...state, SubSegPes: action.payload.SubSegPes };
        break;
        case 'setSegPes':
            return { ...state, SegPes: action.payload.SegPes };
        break;
        case 'setSegEmp':
            return { ...state, SegEmp: action.payload.SegEmp };
        break;
        case 'setSegAnun':
            return { ...state, SegAnun: action.payload.SegAnun };
        break;
        case 'setConfigApp':
            return { ...state, ConfigApp: action.payload.ConfigApp };
        break;
        case 'setVersao':
            return { ...state, versao: action.payload.versao };
        break;
        case 'setRedeSocial':
            return { ...state, redeSocial: action.payload.redeSocial };
        break;
        case 'setFotoPerfil':
            return { ...state, fotoPerfil: action.payload.fotoPerfil };
        break;
        case 'setNome':
            return { ...state, nome: action.payload.nome };
        break;
        case 'setInforUsers':
            return { ...state,  InforUsers: action.payload.InforUsers };
        break;
        case 'setInforArea':
            return { ...state,  InforArea: action.payload.InforArea };
        break;
        case 'setInforEmp':
            return { ...state,  InforEmp: action.payload.InforEmp };
        break;
        case 'setInforConf':
            return { ...state,  InforConf: action.payload.InforConf };
        break;
        
        case 'setIdReg':
            return { ...state, IdReg: action.payload.IdReg };
        break;
        case 'setDatAti':
            return { ...state, DatAti: action.payload.DatAti };
        break;
        case 'setIdCli':
            return { ...state,  IdCli: action.payload.IdCli };
        break;
        case 'setIdarea':
            return { ...state,  idArea: action.payload.idArea };
        break;
        case 'setGrupo':
            return { ...state,  grupo: action.payload.grupo };
        break;
        case 'setRegiao':
            return { ...state,   regiao: action.payload.regiao };
        break;
        case 'setArea':
            return { ...state, area: action.payload.area };
        break;
        case 'setVari':
            return { ...state, variTemp: action.payload.variTemp };
        break;
        case 'setIdoc':
            return { ...state, idoc: action.payload.idoc };
        break;
        case 'setLat':
            return { ...state, lat: action.payload.lat };
        break;
        case 'setLog':
            return { ...state, log: action.payload.log };
        break;
        case 'setStatus':
            return { ...state, status: action.payload.status };
        break;
        case 'setEmail':
            return { ...state, email: action.payload.email };
        break;
        case 'setId':
            return { ...state, id: action.payload.id };
        break;
        case 'setNomecompleto':
            return { ...state, nomeCompleto: action.payload.nomeCompleto };
        break;
        case 'setTelefone':
            return { ...state, telefone: action.payload.telefone };
        break;
        case 'setData_nasc':
            return { ...state, data_nasc: action.payload.data_nasc };
        break;
        case 'setCidade':
            return { ...state, cidade: action.payload.cidade };
        break;
        case 'setEstado':
            return { ...state, estado: action.payload.estado };
        break;
        default:
            return state;
    }
}