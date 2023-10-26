import {Route, Routes} from "react-router-dom";
import FullFeaturedCrudGrid from "./Components/Table/table";


function AppRoutes(props) {
    return  <Routes>
        <Route path="bookshelf" element={<FullFeaturedCrudGrid/>}/>
        <Route path="*" element={<FullFeaturedCrudGrid/>} />
        {/*<Route index </>*/}
    </Routes>
}
export default AppRoutes;