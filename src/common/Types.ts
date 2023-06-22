import { LayoutKeys } from '@/dtos/layout.dto';
import { NextPage } from 'next';

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};
