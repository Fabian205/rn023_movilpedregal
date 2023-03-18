import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BienvenidosScreen from '../screens/BienvenidosScreen';
import CambiarContraScreen from '../screens/CambiarContraScreen';
import MenuInicioScreen from '../screens/MenuInicioScreen';
import EstadosCuentaScreen from '../screens/EstadosCuentaScreen';
import ConsultaPagosScreen from '../screens/ConsultaPagosScreen';
import HistorialPropiedadScreen from '../screens/HistorialPropiedadScreen';
import DocumentosScreen from '../screens/DocumentosScreen';
import AdministradorScreen from '../screens/AdministradorScreen';
import LoginScreenAdmin from '../screens/LoginScreenAdmin';
import AcercaDeScreen from '../screens/AcercaDeScreen';
import ReglamentoInternoScreen from '../screens/ReglamentoInterno';
import ActasResolucionesScreen from '../screens/ActasResolucionesScreen';
import ActasResolDescripScreen from '../screens/ActasResolDescripScreen';
import ConsultaCuentasAdmScreen from '../screens/ConsultaCuentasAdmScreen';
import ConsultaPagosAdmScreen from '../screens/ConsultaPagosAdmScreen';
import ConsultaExpensasAdmScreen from '../screens/ConsultaExpensasAdmScreen';
import ConsultaHistorialAdmScreen from '../screens/ConsultaHistorialAdmScreen';
import EstadoCuentaGralAdmScreen from '../screens/EstadoCuentaGralAdmScreen';
import RegistroAdmScreen from '../screens/RegistroAdmScreen';
import EdicionCompAdmScreen from '../screens/EdicionCompAdmScreen';
import BuscaComprobantesAdmScreen from '../screens/BuscaComprobantesAdmScreen';
import BuscaCompAdminDetalleScreen from '../screens/BuscaCompAdminDetalleScreen';
import ConsultaPagosCasaAdminScreen from '../screens/ConsultaPagosCasaAdminScreen';
import ConsultaPagosCompAdminScreen from '../screens/ConsultaPagosCompAdminScreen';

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,                   
                }}
            >
                <Stack.Screen
                    name = 'Home'
                    component={HomeScreen}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                />
                <Stack.Screen
                    name='Welcome'
                    component={BienvenidosScreen}                   
                />
                <Stack.Screen
                    name='CambiaContra'
                    component={CambiarContraScreen}
                />
                <Stack.Screen
                    name='MenuInicio'
                    component={MenuInicioScreen}
                />
                <Stack.Screen
                    name='EstadosCuenta'
                    component={EstadosCuentaScreen}
                />
                <Stack.Screen
                    name='ConsultaPagos'
                    component={ConsultaPagosScreen}
                />
                <Stack.Screen
                    name='HistorialPropiedad'
                    component={HistorialPropiedadScreen}
                />
                <Stack.Screen
                    name='Documentos'
                    component={DocumentosScreen}                   
                />                 
                <Stack.Screen
                    name='Administrador'
                    component={AdministradorScreen}
                />
                <Stack.Screen
                    name='LoginAdmin'
                    component={LoginScreenAdmin}
                />  
                <Stack.Screen
                    name='AcercaDe'
                    component={AcercaDeScreen}
                />
                <Stack.Screen
                    name='ReglamentoInterno'
                    component={ReglamentoInternoScreen}
                />
                <Stack.Screen
                    name='ActasResoluciones'
                    component={ActasResolucionesScreen}
                />
                <Stack.Screen
                    name='ActasResoDescrip'
                    component={ActasResolDescripScreen}
                />
                <Stack.Screen
                    name='ConsultaCuentasAdmScreen'
                    component={ConsultaCuentasAdmScreen}
                />
                <Stack.Screen
                    name='ConsultaPagosAdmScreen'
                    component={ConsultaPagosAdmScreen}
                />
                <Stack.Screen
                    name='ConsultaExpensasAdmScreen'
                    component={ConsultaExpensasAdmScreen}
                />
                <Stack.Screen
                    name='ConsultaHistorialAdmScreen'
                    component={ConsultaHistorialAdmScreen}
                />
                <Stack.Screen
                    name='EstadosCuentaGralAdmScreen'
                    component={EstadoCuentaGralAdmScreen}
                />
                <Stack.Screen
                    name='RegistroAdmScreen'
                    component={RegistroAdmScreen}
                />
                <Stack.Screen
                    name='EdicionCompAdmin'
                    component={EdicionCompAdmScreen}
                />
                <Stack.Screen
                    name='ConsultaPagosCasaAdmin'
                    component={ConsultaPagosCasaAdminScreen}
                />
                <Stack.Screen
                    name='ConsultaPagosCompAdmin'
                    component={ConsultaPagosCompAdminScreen}
                />
                <Stack.Screen
                    name='BuscaComprobantesAdm'
                    component={BuscaComprobantesAdmScreen}
                />
                <Stack.Screen
                    name='BuscaCompAdminDetalle'
                    component={BuscaCompAdminDetalleScreen}
                />                              
            </Stack.Navigator>           
        </NavigationContainer>
    )
}

export default MainStack