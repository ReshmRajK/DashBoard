import BASE_URL from "./baseUrl";
import { commonStructure } from './commonStructure'

export const graphDataApi = async () => {
    return await commonStructure("GET", `${BASE_URL}/api/graph`, {})
}

export const pieChartDataApi = async () => {
    return await commonStructure("GET", `${BASE_URL}/api/pie-chart`, {})
}

export const tableDataApi = async () => {
    return await commonStructure("GET", `${BASE_URL}/api/table`, {})
}

