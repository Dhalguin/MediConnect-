import axios from "axios";
import types from "./types.js";
import swal from "sweetalert";
const URL = "http://localhost:3001";

export const getDoctors = (id_patient) => {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/patient/doctors/${id_patient}`);
    dispatch({ type: types.GET_DOCTORS, payload: response });
  };
};

export const getUser = (user) => {
  return async function (dispatch) {
    try{ 
      const response = await axios.post(`${URL}/login`, user, {
        withCredentials: true,
      });
      sessionStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: types.GET_USER_LOGIN, payload: response.data });
    }catch(e){ 
        console.log(e)
    }
   
  };
};

export const postDoctor = (payload, history,handleState) => {
  return async function (dispatch) {
    try {
      const config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
         handleState(percentCompleted)
        }
      }
      const response = await axios.post(`${URL}/doctor`, payload,config);
      swal({
        title: `El registro fue exitoso`,
        icon: "success",
        button: "Continuar",
      }).then(() => history.push("/login"));
      return dispatch({
        type: types.POST_DOCTOR,
        payload: response.data,
      });
    } catch (error) {
      swal({
        title: "No se puedo registrar el usuario",
        dangerMode: true,
        icon: "error",
        button: "Reintentar",
      }).then(() => history.push("/register/doctor"));
    }
  };
};

export function getSpecialities() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/specialities`);
      return dispatch({
        type: types.GET_SPECIALITIES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Actions - getSpecialities---> ", error);
    }
  };
}

export const postPatient = (payload, history,handleState) => {
  return async function (dispatch) {
    try {
      const config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
         handleState(percentCompleted)
        }
      }
      await axios.post(`${URL}/patient`, payload,config);
      swal({
        title: `El registro fue exitoso`,
        icon: "success",
        button: "Continuar",
      }).then(() => history.push("/login"));
      return dispatch({
        type: types.POST_PATIENT,
        payload,
      });
    } catch (error) {
      swal({
        title: "No se puedo registrar el usuario",
        dangerMode: true,
        icon: "error",
        button: "Reintentar",
      }).then(() => history.push("/register/patient"));
    }
  };
};

export const getHealthInsurances = () => {
  return async function (dispatch) {
    try {
      let healthInsurances = await axios.get(`${URL}/healthinsurance`);
      return dispatch({
        type: types.GET_HEALTHINSURANCES,
        payload: healthInsurances.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getMyDoctors = (payload) => {
  return async function (dispatch) {
    try {
      let myDocs = await axios.get(`${URL}/patient/doctors/${payload}`);
      return dispatch({
        type: types.GET_MY_DOCTORS,
        payload: myDocs.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const postMyDoctor = (payload, id_Doctor) => {
  return async function (dispatch) {
    try {
      await axios.post(`${URL}/patient/doctors/${payload}`, {
        id_Doctor: id_Doctor,
      });
      swal({
        title: "Se acepto la solicitud",
        icon: "success",
        timer: 2000,
      });
      return dispatch({
        type: types.POST_MY_DOCTOR,
        id_Doctor,
      });
    } catch (error) {
      alert(error); // CORREGIR! ----> EL MENSAJE A MOSTRAR TIENE QUE VENIR DEL BACK
    }
  };
};

export const filterMyPatientsByName = (patientName, id_doctor) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${URL}/doctor/patients/${id_doctor}?patient=${patientName}`
      );
      
      if (response.data.data.length) {
        return dispatch({
          type: types.FILTER_MY_PATIENTS_BY_NAME,
          payload: response.data,
        });
      } else {
        swal({
          title: "No tiene asociado un paciente con ese nombre",
          icon: "info",
          button: "Continuar",
        });
      }
    } catch (error) {
      alert(error);
    }
  };
};

// VER, SI NO SE USA, BORRARLA
export const filterSpecialities = (optionSelected) => {
  return {
    type: types.FILTER_SPECIALITIES,
    payload: optionSelected,
  };
};

// Filtra por especialidad en doctores asociados al paciente
export const filterSpecialitiesMyDoctors = (optionSelected) => {
  return {
    type: types.FILTER_SPECIALITIES_MY_DOCTORS,
    payload: optionSelected,
  };
};

// Filtra por especialidad en doctores NO asociados al paciente
export const filterSpecialitiesAllDoctors = (optionSelected) => {
  return {
    type: types.FILTER_SPECIALITIES_ALL_DOCTORS,
    payload: optionSelected,
  };
};

//Filtra por nombres en el estado de doctores NO asociados al paciente
export const filterDoctorsByName = (nameDoc, idPatient) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${URL}/patient/doctors/${idPatient}?doctor=${nameDoc}`
      );
      return dispatch({
        type: types.FILTER_DOCTORS_BY_NAME,
        payload: response,
      });
    } catch (error) {
      alert(error);
    }
  };
};

//Filtra por nombres en el estado de doctores asociados al paciente
export const filterMyDoctorsByName = (nameDoc, idPatient) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${URL}/patient/doctors/${idPatient}?doctor=${nameDoc}`
      );
      return dispatch({
        type: types.FILTER_MY_DOCTORS_BY_NAME,
        payload: response,
      });
    } catch (error) {
      alert(error);
    }
  };
};

/*
Para eliminar un Doctor a lista de Doctores de un Paciente
Se envia por params el id del Paciente
Y se envia por query el id del Doctor
*/
export const deleteDoctor = (id, id_Doctor) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `${URL}/patient/doctors/${id}?id_Doctor=${id_Doctor}`
      );
      return dispatch({
        type: types.DELETE_DOCTOR,
        payload: response,
      });
    } catch (error) {
      swal({
        title: `${error}`,
        icon: "info",
        button: "Continuar",
      });
    }
  };
};

export const getNotifications = (idDoctor) => {
  return async function (dispatch) {
    try {
      const notif = await axios.get(
        `${URL}/notifications?idDoctor=${idDoctor}&type=solicitud`
      );
      return dispatch({
        type: types.GET_NOTIFICATIONS,
        payload: notif.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const deleteNotifications = (id) => {
  return {
    type: types.DELETE_NOTIFICATIONS,
    payload: id,
  };
};

export const rejectNotification = (id) => {
  return async function (dispatch) {
    try {
      await axios.put(`${URL}/notifications/reject`, { idPatient: id });
      alert("Se rechazo la notificacion");
      return {
        type: types.REJECT_NOTIFICATION,
        payload: id,
      };
    } catch (error) {
      alert(error);
    }
  };
};

export const getMyPatients = (idDoctor) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/doctor/patients/${idDoctor}`);
      return dispatch({
        type: types.GET_MY_PATIENTS,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getContact = (email, rol) => {
  return {
    type: types.GET_CONTACT,
    payload: email,
    rol,
  };
};

export const getMessage = (dniSender, dniReciver) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${URL}/chat?dniSender=${dniSender}&dniReciver=${dniReciver}`
      );
      return dispatch({
        type: types.GET_MESSAGE,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getConversations = (dniSender, dniReciver)=>{ 
      return async function(dispatch){
        const response = await axios.get(`${URL}/chat/conversation?dniSender=${dniSender}&dniReciver=${dniReciver}`)
        return dispatch({
          type: types.GET_CONVERSATION,
          payload: response.data
        })
      }
}

export const getNotificationsMessage = (dniReciver) => {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/chat/notifications?dniReciver=${dniReciver}&type=message`)
    return dispatch({
      type: types.GET_NOTIFICATIONS_MESSAGE,
      payload: response.data
    })
  } 
}

export const deleteNotificationChat = (personDni) => {
  return async function (dispatch) {
    await axios.delete(`${URL}/chat/notifications/delete?personDni=${personDni}&type=message`)
    return dispatch({
      type: types.DELETE_NOTIFICATION_CHAT
    })
  }
}

export const postPrescription = (idDoctor, idPatient, payload) => {
  return async function (dispatch){
    await axios.post(`${URL}/doctor/prescription?patientId=${idPatient}&doctorId=${idDoctor}`, payload)
    return dispatch({
      type: types.POST_PRESCRIPTION,
      payload
    })
  }
}

export const postOrder = (idDoctor, idPatient, payload) => {
  return async function (dispatch){
    await axios.post(`${URL}/doctor/medicalorder?patientId=${idPatient}&doctorId=${idDoctor}`, payload)
    return dispatch({
      type: types.POST_ORDER,
      payload
    })
  }
}