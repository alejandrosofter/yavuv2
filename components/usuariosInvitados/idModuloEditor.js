import { Rating } from "@mui/material";
import PropTypes from 'prop-types';

function RatingEditInputCell(props) {
    const { id, value, api, field } = props;
  console.log(props)
    const handleChange = async (event) => {
      api.setEditCellValue({ id, field, value: Number(event.target.value) }, event);
      // Check if the event is not from the keyboard
      // https://github.com/facebook/react/issues/7407
      if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
        await api.commitCellChange({ id, field });
        api.setCellMode(id, field, 'view');
      }
    };
  
    const handleRef = (element) => {
      if (element) {
        element.querySelector(`input[value="${value}"]`).focus();
      }
    };
  
    return (
      <div >
        <Rating
          ref={handleRef}
          name={`mods.${props.id}.idMod`}
          precision={1}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
  
  RatingEditInputCell.propTypes = {
    /**
     * GridApi that let you manipulate the grid.
     */
    api: PropTypes.any.isRequired,
    /**
     * The column field of the cell that triggered the event
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.number.isRequired,
  };
  
  export function RenderRatingEdit(params) {
    return <RatingEditInputCell {...params} />;
  }
  export function RenderRating(params) {
    return <Rating readOnly value={params.value} />;
  }