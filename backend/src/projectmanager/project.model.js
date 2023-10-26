module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        rera_registration: DataTypes.STRING,
        build_id: DataTypes.INTEGER,
        url: DataTypes.STRING,
        name: DataTypes.STRING,
        p_typeid: DataTypes.INTEGER,
        ship: DataTypes.STRING,
        address: DataTypes.STRING,
        state_id: DataTypes.INTEGER,
        city_id: DataTypes.INTEGER,
        location_id: DataTypes.INTEGER,
        subscription_order_id: DataTypes.STRING,
        age: DataTypes.STRING,
        cus_id: DataTypes.INTEGER,
        option: DataTypes.STRING,
        room: DataTypes.STRING,
        bath: DataTypes.STRING,
        floor: DataTypes.STRING,
        p_floor: DataTypes.STRING,
        flooring: DataTypes.STRING,
        faceid: DataTypes.INTEGER,
        area: DataTypes.STRING,
        type: DataTypes.STRING,
        carpet: DataTypes.STRING,
        a_unit: DataTypes.STRING,
        p_unit: DataTypes.STRING,
        build: DataTypes.STRING,
        b_unit: DataTypes.STRING,
        tot_price: DataTypes.STRING,
        description: DataTypes.STRING,
        remark: DataTypes.STRING,
        terms: DataTypes.STRING,
        count_id: DataTypes.INTEGER,
        country: DataTypes.STRING,
        featured: DataTypes.STRING,
        featureimage: DataTypes.STRING,
        vid_url: DataTypes.STRING,
        address2: DataTypes.STRING,
        pincode: DataTypes.STRING,
        t_type: DataTypes.STRING,
        featured_gallery: DataTypes.STRING,
        area_in_sqft: DataTypes.STRING,

        status: {
            type: DataTypes.STRING,
            defaultValue: "Y",
        },
        featured_post: {
          type: DataTypes.STRING,
          defaultValue: "N",
      },
      
        type: {
          type: DataTypes.STRING,
          defaultValue: 1,
      },
      featured_gallery: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
    }, {
        tableName: 'cms_properties',
    })



      Project.associate = function (models) {
          Project.belongsTo(models.Builder, {
            foreignKey: 'build_id',
          });
          Project.belongsTo(models.propertyTypes, {
            foreignKey: 'p_typeid',
          });
          Project.belongsTo(models.Location, {
            foreignKey: 'location_id',
          });
        
          Project.hasMany(models.propertyImage, {
        foreignKey: 'pro_id',
      })
      Project.hasMany(models.Propertyfeature, {
        foreignKey: 'pro_id',
      })

      Project.hasMany(models.propertydetails, {
        foreignKey: 'pro_id',
      })
         };

    return Project;
};
