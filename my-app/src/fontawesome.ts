//Khởi tạo thư viện icon
import { library } from "@fortawesome/fontawesome-svg-core";

//Import các icon mà bạn muốn sử dụng trong từng gói
// import { faMoneyBill } from '@fortawesome/pro-solid-svg-icons';
import {
  faCode,
  faHighlighter,
  faUser,
  faPhone,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

//A dd các icon đã được import vào trong thư viện
library.add(/* faMoneyBill */ faCode, faHighlighter, faUser, faPhone, faFolderOpen);
