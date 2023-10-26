import {Route, Routes} from "react-router-dom";
import FullFeaturedCrudGrid from "./Components/Table/table";
import BookCard from "./Components/card/bookCard";


function AppRoutes(props) {
    return  <Routes>
        <Route path="/:id" element={<BookCard />}/>
        <Route path="*" element={<FullFeaturedCrudGrid/>} />
        {/*<Route index </>*/}
    </Routes>
}
export default AppRoutes;