import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { comError } from '@utils/error';
// import { RedisCacheService } from '@modules/redis-utils/redis-cache/redis-cache.service';
// import { ToolsService } from '@tools/tools.service';

const excludeMap = new Map([
  ['/user/login', 'POST'],
  ['/user', 'POST'], // 测试
]);

/**
 * 用户登录，生成token(uuid~~~)(user_session_uuid存入redis)
 * 除了登录接口，其他接口从redis查询，有没有值，有值就true，没值就false
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {} // private readonly toolsService: ToolsService, // private readonly redisCacheService: RedisCacheService,
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const excludeMethod = excludeMap.get(request.url);
    if (excludeMethod) {
      if (excludeMethod === request.method) {
        return true;
      }

      // 存在user 有权限
      return !!request.user;
    } else {
      return false;
    }
  }
}
