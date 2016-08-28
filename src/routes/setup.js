import Router from 'koa-router';

const Sector = 'Setup';

const setup = new Router();

setup
  .post('/', async (ctx, next)=>{
    if(ctx.request.body.tags){
      ctx.status = 403;
    } else {
      const {repository} = ctx.services;
      const getSetup = await repository.retrieve(Sector, 'setup');
      if(getSetup){
        cts.status = 403;
      } else {
        let user = ctx.request.body;
        user.tags = ['admin', 'mod', 'editor', 'user'];
        const storedUser = await repository.store('Users', ctx.request.body.username, ctx.request.body);
        const storedPage = await repository.store('Pages', 'indexroute', {
          'pageid': 'indexroute',
          'title': 'Home',
          'tags': [],
          'content': [
            {
              'component': 'Header',
              'children': '# Welcome home'
            },
            {
              'component': 'Section',
              'children': [
                {
                  'component': 'PageHeader',
                  'children': 'Home'
                },
                {
                  'component': 'Article',
                  'props': {
                    'title': 'Article Title',
                    'author': 'Author',
                    'date': 1471759742287
                  },
                  'children': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut aliquet nunc. Maecenas commodo libero arcu, vitae ultrices quam iaculis vitae. Nulla eros purus, auctor sed laoreet in, pharetra eget mi. Phasellus molestie id odio eu mollis. Proin nec tellus et lectus suscipit cursus quis eget eros. Nunc interdum lacus elit, id gravida ligula placerat eu. Nullam hendrerit iaculis lorem, nec scelerisque turpis pretium ac. Morbi blandit dolor massa, cursus lobortis eros malesuada ut. Sed semper ullamcorper gravida. Integer at diam urna. In ligula tortor, egestas nec dictum eu, suscipit vitae mauris. Sed imperdiet sit amet massa at fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

    Maecenas vulputate nec mi non posuere. Vestibulum malesuada erat justo, at aliquet enim posuere vestibulum. Ut viverra porta est, eu semper lacus euismod et. Curabitur elementum vestibulum nisi imperdiet ornare. Nulla lobortis mi eu dictum viverra. Donec rhoncus, tortor vitae lobortis fringilla, eros nibh malesuada erat, faucibus condimentum risus urna ut elit. Phasellus non ullamcorper lectus, eu rutrum risus. Nullam convallis scelerisque justo ac sollicitudin. Duis nisi arcu, condimentum non eros in, rutrum mollis urna. Integer elit orci, rhoncus sit amet rutrum vitae, ullamcorper ut leo. Donec ut tempus eros.`
                }
              ]
            }
          ]
        });
        if(!storedUser || !storedPage){
          ctx.status = 403;
        } else {
          const toggleSetup = await repository.store(Sector, 'setup', true);
          if(!toggleSetup){
            ctx.status = 409;
          } else {
            ctx.body = {setup: toggleSetup, status: true};
          }
        }
      }
    }
    await next();
  });

export {setup};
