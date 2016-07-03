import React from 'react';
import {List, ListItem,Drawer,Menu,Dialog,TextField,DatePicker,FlatButton,Paper,RaisedButton,IconButton} from 'material-ui';
import {Table,TableHeader,TableBody,TableFooter,TableRow,TableRowColumn,TableHeaderColumn} from 'material-ui';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import IconForward from 'material-ui/svg-icons/navigation/chevron-right';
import IconBackD from 'material-ui/svg-icons/navigation/first-page';
import IconForwardD from 'material-ui/svg-icons/navigation/last-page';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.usernameCheck = this.usernameCheck.bind(this);
        this.passwordCheck = this.passwordCheck.bind(this);
        this.rowSelect = this.rowSelect.bind(this);
        this.state = {open: false, showCheckboxes: true, password: {errorText: ''}, username: {errorText: ''}}
    }

    rowSelect(select){

    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {

        this.setState({open: false});
    }

    usernameCheck() {
        var {username} = this.refs;
        if (/^[\da-zA-Z]{6,18}$/.test(username.input.value)) {
            this.setState({
                username: {errorText: ''}
            });
            return true;
        } else {
            this.setState({
                username: {errorText: '用户名格式为6-12个英文字母或数字'}
            });
            return false;
        }
    }

    passwordCheck() {
        var {password} = this.refs;
        if (/^[\da-zA-Z]{6,18}$/.test(password.input.value)) {
            this.setState({
                password: {errorText: ''}
            });
            return true;
        } else {
            this.setState({
                password: {errorText: '密码格式为6-12个英文字母或数字'}
            });
            return false;
        }
    }

    submitForm() {
        if (this.usernameCheck() && this.passwordCheck()) {
            console.log('ok');
        }
    }

    render() {
        const actions = [
            <FlatButton label="关闭"
                        primary={true}
                        onTouchTap={this.handleClose}/>,
            <FlatButton label="提交"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.submitForm}/>
        ];
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <div>
                    <Drawer open={true}>
                        <List>
                            <ListItem insetChildren={true} primaryText="Sent mail" leftIcon={<ContentSend />}
                                      onTouchTap={this.handleOpen}
                            />
                            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />}/>
                            <ListItem
                                primaryText="Inbox"
                                leftIcon={<ContentInbox />}
                                initiallyOpen={true}
                                primaryTogglesNestedList={true}
                                nestedItems={[
          <ListItem
            key={1}
            primaryText="Starred"
            leftIcon={<ActionGrade />}
          />,
          <ListItem
            key={2}
            primaryText="Sent Mail "
            leftIcon={<ContentSend />}
            disabled={true}
            nestedItems={[
              <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
            ]}
          />
        ]}
                            />
                        </List>
                    </Drawer>
                    <div style={{paddingLeft:'256px'}}>
                        <Table multiSelectable={true} onRowSelection={this.rowSelect}>
                            <TableHeader displaySelectAll={this.state.showCheckboxes}
                                         adjustForCheckbox={this.state.showCheckboxes}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>姓名</TableHeaderColumn>
                                    <TableHeaderColumn>密码</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                                <TableRow key={5}>
                                    <TableRowColumn>1</TableRowColumn>
                                    <TableRowColumn>吕铭印</TableRowColumn>
                                    <TableRowColumn>lvmingyin</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>1</TableRowColumn>
                                    <TableRowColumn>吕铭印</TableRowColumn>
                                    <TableRowColumn>lvmingyin</TableRowColumn>
                                </TableRow>
                            </TableBody>
                            <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
                                <TableRow>
                                    <TableRowColumn style={{width:'160px'}}>
                                        <RaisedButton label="开始认证"/>
                                        <RaisedButton label="删除"/>
                                    </TableRowColumn>
									
                                    <TableRowColumn>
                                        <FlatButton style={{width:'36px',minWidth:'36px'}}>
                                            <IconBackD style={{verticalAlign:'middle'}} />
                                        </FlatButton>
                                        <FlatButton style={{width:'36px',minWidth:'36px'}}>
                                            <IconBack style={{verticalAlign:'middle'}} />
                                        </FlatButton>
                                        <FlatButton label="1"/>
                                        <FlatButton label="2"/>
                                        <FlatButton label="3"/>
                                        
                                        <FlatButton style={{width:'36px',minWidth:'36px'}}>
                                            <IconForward style={{verticalAlign:'middle'}} />
                                        </FlatButton>
										<FlatButton style={{width:'36px',minWidth:'36px'}}>
                                            <IconForwardD style={{verticalAlign:'middle'}} />
                                        </FlatButton>
                                    </TableRowColumn>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
					
                    <Dialog
                        contentStyle={{width:'500px'}}
                        title="登录"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <TextField floatingLabelText="用户名"
                                   hintText="6-12个字符"
                                   errorText={this.state.username.errorText}
                                   ref='username'
                                   onBlur={this.usernameCheck}
                                   floatingLabelFixed={true}
                                   fullWidth={true}
                        /><br/>
                        <TextField floatingLabelText="密码"
                                   hintText="6-20个字符"
                                   errorText={this.state.password.errorText}
                                   floatingLabelFixed={true}
                                   onBlur={this.passwordCheck}
                                   fullWidth={true}
                                   ref='password'
                                   type="password"/>

                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}