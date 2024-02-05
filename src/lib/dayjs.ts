import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);
