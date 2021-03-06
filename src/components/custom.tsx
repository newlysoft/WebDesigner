import * as React from "react";

const REQUIRED_FIELD_SYMBOL = "*";

function IconBtn(props: any) {
  const { type = "default", icon, className, ...otherProps } = props;
  return (
    <button
      type="button"
      className={`btn btn-${type} ${className}`}
      {...otherProps}
    >
      <i className={`glyphicon glyphicon-${icon}`} />
    </button>
  );
}
// Used in the two templates
function DefaultArrayItem(props: any) {
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return (
    <div key={props.index} className={props.className}>
      <div className={props.hasToolbar ? "col-xs-9" : "col-xs-12"}>
        {props.children}
      </div>

      {props.hasToolbar && (
        <div className="col-xs-3 array-item-toolbox">
          <div
            className="btn-group"
            style={{
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            {(props.hasMoveUp || props.hasMoveDown) && (
              <IconBtn
                icon="arrow-up"
                className="array-item-move-up"
                tabIndex="-1"
                style={btnStyle}
                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                onClick={props.onReorderClick(props.index, props.index - 1)}
              />
            )}

            {(props.hasMoveUp || props.hasMoveDown) && (
              <IconBtn
                icon="arrow-down"
                className="array-item-move-down"
                tabIndex="-1"
                style={btnStyle}
                disabled={
                  props.disabled || props.readonly || !props.hasMoveDown
                }
                onClick={props.onReorderClick(props.index, props.index + 1)}
              />
            )}

            {props.hasRemove && (
              <IconBtn
                type="danger"
                icon="remove"
                className="array-item-remove"
                tabIndex="-1"
                style={btnStyle}
                disabled={props.disabled || props.readonly}
                onClick={props.onDropIndexClick(props.index)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function AddButton(props: any) {
  const { onClick, disabled } = props;
  return (
    <div className="row">
      <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
        <IconBtn
          type="info"
          icon="plus"
          className="btn-add col-xs-12"
          tabIndex="0"
          onClick={onClick}
          disabled={disabled}
        />
      </p>
    </div>
  );
}

function DefaultFixedArrayFieldTemplate(props: any) {
  return (
    <fieldset className={props.className}>
      test
      <ArrayFieldTitle
        key={`array-field-title-${props.idSchema.$id}`}
        TitleField={props.TitleField}
        idSchema={props.idSchema}
        title={props.uiSchema["ui:title"] || props.title}
        required={props.required}
      />
      {(props.uiSchema["ui:description"] || props.schema.description) && (
        <div
          className="field-description"
          key={`field-description-${props.idSchema.$id}`}
        >
          {props.uiSchema["ui:description"] || props.schema.description}
        </div>
      )}
      <div
        className="row array-item-list"
        key={`array-item-list-${props.idSchema.$id}`}
      >
        {props.items && props.items.map(DefaultArrayItem)}
      </div>
      {props.canAdd && (
        <AddButton
          onClick={props.onAddClick}
          disabled={props.disabled || props.readonly}
        />
      )}
    </fieldset>
  );
}

export class DefaultNormalArrayFieldTemplate extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { show: true };
  }
  render() {
    const props = this.props;
    return (
      <fieldset className={props.className}>
        <ArrayFieldTitle
          key={`array-field-title-${props.idSchema.$id}`}
          TitleField={props.TitleField}
          idSchema={props.idSchema}
          title={props.uiSchema["ui:title"] || props.title}
          required={props.required}
          show={this.state.show}
          onClick={(e: any) => {
            if (this.state.show) {
              this.setState({ show: false });
            } else {
              this.setState({ show: true });
            }
          }}
        />
        {(props.uiSchema["ui:description"] || props.schema.description) && (
          <ArrayFieldDescription
            key={`array-field-description-${props.idSchema.$id}`}
            DescriptionField={props.DescriptionField}
            idSchema={props.idSchema}
            description={
              props.uiSchema["ui:description"] || props.schema.description
            }
          />
        )}
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <div
            className="row array-item-list"
            key={`array-item-list-${props.idSchema.$id}`}
          >
            {props.items && props.items.map((p: any) => DefaultArrayItem(p))}
          </div>
          {props.canAdd && (
            <AddButton
              onClick={props.onAddClick}
              disabled={props.disabled || props.readonly}
            />
          )}
        </div>
      </fieldset>
    );
  }
}

export const CustomTitleField = (props: any) => {
  const { id, title, required, show, onClick } = props;
  const legend = required ? title + REQUIRED_FIELD_SYMBOL : title;
  return (
    <legend id={id} onClick={onClick} style={{ cursor: "pointer" }}>
      {legend}
      {show ? "-" : "+"}
    </legend>
  );
};

function ArrayFieldTitle(props: any) {
  const { TitleField, idSchema, title, required, show, onClick } = props;
  if (!title) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  const id = `${idSchema.$id}__title`;
  return (
    <TitleField
      id={id}
      title={title}
      required={required}
      onClick={onClick}
      show={show}
    />
  );
}

function ArrayFieldDescription(props: any) {
  const { DescriptionField, idSchema, description } = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  const id = `${idSchema.$id}__description`;
  return <DescriptionField id={id} description={description} />;
}

export class ObjectFieldTemplate extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { show: true };
  }

  render() {
    const props: any = this.props;
    const { TitleField, DescriptionField } = props;

    return (
      <fieldset>
        {(props.uiSchema["ui:title"] || props.title) && (
          <TitleField
            show={this.state.show}
            onClick={(e: any) => {
              if (this.state.show) {
                this.setState({ show: false });
              } else {
                this.setState({ show: true });
              }
            }}
            id={`${props.idSchema.$id}__title`}
            title={props.title || props.uiSchema["ui:title"]}
            required={props.required}
            formContext={props.formContext}
          />
        )}
        <div style={{ display: this.state.show ? "block" : "none" }}>
          {props.description && (
            <DescriptionField
              id={`${props.idSchema.$id}__description`}
              description={props.description}
              formContext={props.formContext}
            />
          )}
          {props.properties.map((prop: any) => prop.content)}
        </div>
      </fieldset>
    );
  }
}
