'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Document = use('App/Models/Document')

Route.group(() => {
  Route.get('documents', 'DocumentController.index')
  Route.get('documents/:id', 'DocumentController.show')
  Route.post('documents', 'DocumentController.store')
  Route.put('documents/:id', 'DocumentController.update')
  Route.delete('documents/:id', 'DocumentController.delete')
}).prefix('api/v1')
