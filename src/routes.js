import {Route, Routes} from "react-router-dom";
import FullFeaturedCrudGrid from "./Components/Table/table";
import BookCard from "./Components/card/bookCard";


function AppRoutes(props) {
    return  <Routes>
        <Route path="bookshelf" element={<FullFeaturedCrudGrid/>}/>
        <Route path="bookshelf/:id" element={<BookCard />}/>
        <Route path="*" element={<FullFeaturedCrudGrid/>} />
        {/*<Route index </>*/}
    </Routes>
}
export default AppRoutes;