// import { t } from 'i18next';
import { ControllerInterface } from '../../interfaces/controller.interface';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { GetTestInterface } from '../../interfaces/useCaseDTO/getTest.interfaces';

// import { Get, Route, Tags } from 'tsoa';

// @Route('Prueba')
// @Tags('Prueba')
export class GetTest implements ControllerInterface {
  constructor(private readonly getTest: GetTestInterface) {
    this.getTest = getTest;
  }

  // @Get('/')
  /** Example translate implementation, from DB is received a msg_test string,
   * then t is decoupled from httRequest obj, after that is translated and returned
   * */
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { t } = httpRequest;
      const { content } = await this.getTest.get();

      return successHelper({
        result: t(content),
      });
    } catch (error) {
      throw serverErrorHelper(error);
    }
  }
}
